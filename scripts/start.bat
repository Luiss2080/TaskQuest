@echo off
color 0B
echo ===================================================
echo       Iniciando TaskQuest - Entorno de Desarrollo
echo ===================================================
echo.

cd ..

:: Verificar si node_modules existe
IF NOT EXIST "node_modules\" (
    echo [INFO] Dependencias no encontradas. Instalando paquetes npm...
    call npm install
    echo [EXITO] Dependencias instaladas.
    echo.
) ELSE (
    echo [INFO] Las dependencias ya estan instaladas.
)

echo [INFO] Iniciando el compilador de Tailwind CSS en modo observador...
echo [INFO] Abre http://localhost/TaskQuest/vistas/ en tu navegador o usa Live Server.
echo.
echo Presiona Ctrl+C para detener el servicio.
echo ===================================================

:: Ejecutar el script dev de package.json directamente en esta ventana
call npm run dev
