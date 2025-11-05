#!/bin/bash

# =====================================
# 🚀 Script d'Installation - Marhaban Canada
# =====================================

set -e  # Arrêter en cas d'erreur

echo "=================================================="
echo "🚀 Installation de Marhaban Canada"
echo "=================================================="
echo ""

# Couleurs pour l'affichage
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

success() {
    echo -e "${GREEN}✓${NC} $1"
}

warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

error() {
    echo -e "${RED}✗${NC} $1"
}

# Vérifier Node.js
info "Vérification de Node.js..."
if ! command -v node &> /dev/null; then
    error "Node.js n'est pas installé!"
    echo "Installez Node.js 20+ depuis: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v)
success "Node.js installé: $NODE_VERSION"

# Vérifier npm
info "Vérification de npm..."
if ! command -v npm &> /dev/null; then
    error "npm n'est pas installé!"
    exit 1
fi

NPM_VERSION=$(npm -v)
success "npm installé: $NPM_VERSION"

echo ""
echo "=================================================="
echo "📦 Installation des dépendances"
echo "=================================================="
echo ""

# Créer les fichiers .env s'ils n'existent pas
info "Vérification des fichiers .env..."

if [ ! -f "frontend/.env" ]; then
    warning "frontend/.env n'existe pas, création à partir de .env.example..."
    if [ -f "frontend/.env.example" ]; then
        cp frontend/.env.example frontend/.env
        success "frontend/.env créé"
    else
        error "frontend/.env.example introuvable!"
    fi
else
    success "frontend/.env existe déjà"
fi

if [ ! -f "backend/.env" ]; then
    warning "backend/.env n'existe pas, création à partir de .env.example..."
    if [ -f "backend/.env.example" ]; then
        cp backend/.env.example backend/.env
        success "backend/.env créé"
    else
        error "backend/.env.example introuvable!"
    fi
else
    success "backend/.env existe déjà"
fi

echo ""

# Installation Backend
info "Installation des dépendances backend..."
cd backend
npm install
success "Dépendances backend installées"
cd ..

echo ""

# Installation Frontend
info "Installation des dépendances frontend..."
cd frontend
npm install
success "Dépendances frontend installées"
cd ..

echo ""
echo "=================================================="
echo "✅ Installation terminée avec succès!"
echo "=================================================="
echo ""
echo "Prochaines étapes:"
echo ""
echo "1. Configurer les credentials Zoho (optionnel):"
echo "   - Éditer backend/.env"
echo "   - Remplir ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN"
echo ""
echo "2. Lancer le projet:"
echo "   ${GREEN}./dev.sh${NC}  (démarre backend et frontend)"
echo ""
echo "3. Consulter la documentation:"
echo "   ${BLUE}cat frontend/DEVELOPMENT_GUIDE.md${NC}"
echo ""
