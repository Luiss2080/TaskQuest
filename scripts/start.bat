@echo off
color 0A
echo ===================================================
echo     TaskQuest V4 - FULLSTACK GAMER EDITION
echo ===================================================
echo.

cd ..

echo [INFO] Iniciando el servidor MEGA GAMER (Frontend + Backend)...
echo [INFO] Asegurate de que MySQL este corriendo en Laragon!
echo.

call npx concurrently "node server/index.js" "vite --open"
