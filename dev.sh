#!/bin/bash

# =====================================
# 🚀 Script de Démarrage - Marhaban Canada
# =====================================

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo "=================================================="
echo "🚀 Démarrage de Marhaban Canada"
echo "=================================================="
echo ""

# Vérifier que les node_modules existent
if [ ! -d "backend/node_modules" ]; then
    echo -e "${RED}✗${NC} Les dépendances backend ne sont pas installées!"
    echo -e "Lancez d'abord: ${GREEN}./setup.sh${NC}"
    exit 1
fi

if [ ! -d "frontend/node_modules" ]; then
    echo -e "${RED}✗${NC} Les dépendances frontend ne sont pas installées!"
    echo -e "Lancez d'abord: ${GREEN}./setup.sh${NC}"
    exit 1
fi

# Vérifier les fichiers .env
if [ ! -f "backend/.env" ]; then
    echo -e "${RED}✗${NC} backend/.env n'existe pas!"
    echo -e "Lancez d'abord: ${GREEN}./setup.sh${NC}"
    exit 1
fi

if [ ! -f "frontend/.env" ]; then
    echo -e "${RED}✗${NC} frontend/.env n'existe pas!"
    echo -e "Lancez d'abord: ${GREEN}./setup.sh${NC}"
    exit 1
fi

echo -e "${BLUE}ℹ${NC} Démarrage du backend et du frontend..."
echo ""
echo -e "${YELLOW}Note:${NC} Utilisez Ctrl+C pour arrêter les serveurs"
echo ""

# Fonction pour arrêter les processus enfants
cleanup() {
    echo ""
    echo -e "${YELLOW}⚠${NC} Arrêt des serveurs..."
    kill $(jobs -p) 2>/dev/null
    exit 0
}

# Capturer Ctrl+C
trap cleanup SIGINT SIGTERM

# Démarrer le backend en arrière-plan
echo -e "${BLUE}[Backend]${NC} Démarrage sur http://localhost:8080"
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# Attendre un peu pour que le backend démarre
sleep 2

# Démarrer le frontend en arrière-plan
echo -e "${BLUE}[Frontend]${NC} Démarrage sur http://localhost:5173"
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "=================================================="
echo -e "${GREEN}✓${NC} Serveurs démarrés!"
echo "=================================================="
echo ""
echo -e "Frontend: ${GREEN}http://localhost:5173${NC}"
echo -e "Backend:  ${GREEN}http://localhost:8080${NC}"
echo ""
echo -e "${YELLOW}Appuyez sur Ctrl+C pour arrêter${NC}"
echo ""

# Attendre que les processus se terminent
wait
