@echo off
REM 🚀 Script de lancement rapide - Marhaban Canada (Windows)

echo 🌍 Marhaban Canada - Démarrage du projet
echo ========================================
echo.

REM Vérifier Node.js
where node >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ❌ Node.js n'est pas installé. Veuillez installer Node.js 20+
    pause
    exit /b 1
)

echo ✅ Node.js détecté
echo.

REM Lancer le backend
echo 🔧 Démarrage du backend...
cd backend

REM Vérifier si .env existe
if not exist .env (
    echo ⚠️  Fichier .env manquant dans backend/
    if exist .env.example (
        echo 📝 Création depuis .env.example...
        copy .env.example .env >nul
        echo ✅ Fichier .env créé. Veuillez le compléter avec vos credentials Zoho.
    )
)

REM Installer les dépendances si nécessaire
if not exist node_modules (
    echo 📦 Installation des dépendances backend...
    call npm install
)

echo 🚀 Lancement du backend sur http://localhost:8080
start "Backend - Marhaban" cmd /k "npm run dev"
cd ..

timeout /t 3 /nobreak >nul

REM Lancer le frontend
echo 🎨 Démarrage du frontend...
cd frontend

REM Installer les dépendances si nécessaire
if not exist node_modules (
    echo 📦 Installation des dépendances frontend...
    call npm install
)

echo 🚀 Lancement du frontend sur http://localhost:5173
start "Frontend - Marhaban" cmd /k "npm run dev"
cd ..

echo.
echo ✅ Services lancés !
echo.
echo 📡 Backend:  http://localhost:8080
echo 🌐 Frontend: http://localhost:5173
echo 📊 API Status: http://localhost:8080/api/status
echo.
echo Fermez les fenêtres pour arrêter les services
pause

