@echo off
color 0B
echo ===================================================
echo   TaskQuest V2 - React + TypeScript + Tailwind
echo ===================================================
echo.

cd ..

echo [INFO] Instalando las nuevas dependencias (React, Vite, Zustand)...
call npm install

echo [INFO] Iniciando servidor de desarrollo con Vite...
echo [INFO] Se abrira una ventana en tu navegador automaticamente.
echo.

:: Vite abrirá automáticamente el navegador si le pasamos --open
call npx vite --open
