#!/bin/bash

# 🚀 Script de lancement rapide - Marhaban Canada

echo "🌍 Marhaban Canada - Démarrage du projet"
echo "========================================"
echo ""

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez installer Node.js 20+"
    exit 1
fi

echo "✅ Node.js $(node --version) détecté"
echo ""

# Fonction pour lancer le backend
start_backend() {
    echo "🔧 Démarrage du backend..."
    cd backend
    
    # Vérifier si .env existe
    if [ ! -f .env ]; then
        echo "⚠️  Fichier .env manquant dans backend/"
        echo "📝 Création depuis .env.example..."
        if [ -f .env.example ]; then
            cp .env.example .env
            echo "✅ Fichier .env créé. Veuillez le compléter avec vos credentials Zoho."
        else
            echo "❌ .env.example non trouvé"
        fi
    fi
    
    # Installer les dépendances si nécessaire
    if [ ! -d "node_modules" ]; then
        echo "📦 Installation des dépendances backend..."
        npm install
    fi
    
    echo "🚀 Lancement du backend sur http://localhost:8080"
    npm run dev &
    BACKEND_PID=$!
    cd ..
}

# Fonction pour lancer le frontend
start_frontend() {
    echo "🎨 Démarrage du frontend..."
    cd frontend
    
    # Installer les dépendances si nécessaire
    if [ ! -d "node_modules" ]; then
        echo "📦 Installation des dépendances frontend..."
        npm install
    fi
    
    echo "🚀 Lancement du frontend sur http://localhost:5173"
    npm run dev &
    FRONTEND_PID=$!
    cd ..
}

# Lancer les deux services
start_backend
sleep 2
start_frontend

echo ""
echo "✅ Services lancés !"
echo ""
echo "📡 Backend:  http://localhost:8080"
echo "🌐 Frontend: http://localhost:5173"
echo "📊 API Status: http://localhost:8080/api/status"
echo ""
echo "Appuyez sur Ctrl+C pour arrêter tous les services"

# Attendre que l'utilisateur arrête
trap "echo ''; echo '🛑 Arrêt des services...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT

wait

