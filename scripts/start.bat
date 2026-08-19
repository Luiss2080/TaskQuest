@echo off
color 0A
echo ===================================================
echo     TaskQuest V3 - ULTIMATE GAMER EDITION
echo ===================================================
echo.

cd ..

echo [INFO] Limpiando archivos antiguos obsoletos...
if exist "js" rmdir /S /Q js
if exist "estilos" rmdir /S /Q estilos
if exist "css" rmdir /S /Q css
if exist "vistas" rmdir /S /Q vistas
if exist "sw.js" del sw.js
if exist "ESTRUCTURA.md" del ESTRUCTURA.md

echo [INFO] Instalando dependencias (por si acaso)...
call npm install

echo [INFO] Iniciando el servidor MEGA GAMER...
call npx vite --open
