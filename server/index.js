import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

// Configuración de MySQL (Asumiendo default de Laragon: root, sin pass)
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
};

let pool;

async function initDB() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    await connection.query('CREATE DATABASE IF NOT EXISTS taskquest_db');
    await connection.end();

    pool = mysql.createPool({
      ...dbConfig,
      database: 'taskquest_db',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ Base de datos MySQL "taskquest_db" y tabla "users" inicializadas.');
  } catch (error) {
    console.error('❌ Error conectando a MySQL (Asegúrate de que Laragon/MySQL esté encendido):', error.message);
  }
}

initDB();

// Registro
app.post('/api/register', async (req, res) => {
  if (!pool) return res.status(500).json({ error: 'Base de datos no conectada. ¡Enciende MySQL en Laragon!' });
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Faltan campos' });

  try {
    const [existing] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (existing.length > 0) return res.status(400).json({ error: 'El jugador ya existe' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
    
    res.json({ success: true, message: 'Jugador registrado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor DB' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  if (!pool) return res.status(500).json({ error: 'Base de datos no conectada. ¡Enciende MySQL en Laragon!' });
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Faltan campos' });

  try {
    const [users] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    const user = users[0];

    if (!user) return res.status(400).json({ error: 'Jugador no encontrado' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: 'Contraseña incorrecta' });

    res.json({ success: true, username: user.username });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor DB' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
