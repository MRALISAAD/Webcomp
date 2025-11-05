#!/bin/bash

# =====================================
# 🔍 Script de Vérification - Marhaban Canada
# =====================================

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo "=================================================="
echo "🔍 Vérification de l'environnement"
echo "=================================================="
echo ""

ERRORS=0

# Fonction de vérification
check() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $2"
    else
        echo -e "${RED}✗${NC} $2"
        ERRORS=$((ERRORS + 1))
    fi
}

# 1. Vérifier Node.js
echo -e "${BLUE}1. Node.js${NC}"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    check 0 "Node.js installé: $NODE_VERSION"

    # Vérifier la version (doit être >= 20)
    MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$MAJOR_VERSION" -ge 20 ]; then
        check 0 "Version Node.js >= 20"
    else
        check 1 "Version Node.js < 20 (installée: $NODE_VERSION, requise: 20+)"
    fi
else
    check 1 "Node.js non installé"
fi
echo ""

# 2. Vérifier npm
echo -e "${BLUE}2. npm${NC}"
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    check 0 "npm installé: $NPM_VERSION"
else
    check 1 "npm non installé"
fi
echo ""

# 3. Vérifier Git
echo -e "${BLUE}3. Git${NC}"
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version)
    check 0 "$GIT_VERSION"

    # Vérifier la branche
    CURRENT_BRANCH=$(git branch --show-current 2>/dev/null)
    if [ -n "$CURRENT_BRANCH" ]; then
        echo -e "  ${BLUE}ℹ${NC} Branche actuelle: $CURRENT_BRANCH"
    fi
else
    check 1 "Git non installé"
fi
echo ""

# 4. Vérifier les fichiers .env
echo -e "${BLUE}4. Fichiers de configuration${NC}"
if [ -f "backend/.env" ]; then
    check 0 "backend/.env existe"
else
    check 1 "backend/.env manquant"
fi

if [ -f "frontend/.env" ]; then
    check 0 "frontend/.env existe"
else
    check 1 "frontend/.env manquant"
fi
echo ""

# 5. Vérifier les dépendances
echo -e "${BLUE}5. Dépendances installées${NC}"
if [ -d "backend/node_modules" ]; then
    BACKEND_PACKAGES=$(ls backend/node_modules | wc -l)
    check 0 "Backend: $BACKEND_PACKAGES packages"
else
    check 1 "Backend: node_modules manquant"
fi

if [ -d "frontend/node_modules" ]; then
    FRONTEND_PACKAGES=$(ls frontend/node_modules | wc -l)
    check 0 "Frontend: $FRONTEND_PACKAGES packages"
else
    check 1 "Frontend: node_modules manquant"
fi
echo ""

# 6. Vérifier Docker (optionnel)
echo -e "${BLUE}6. Docker (optionnel)${NC}"
if command -v docker &> /dev/null; then
    DOCKER_VERSION=$(docker --version)
    check 0 "$DOCKER_VERSION"
else
    echo -e "${YELLOW}⚠${NC} Docker non installé (optionnel)"
fi

if command -v docker-compose &> /dev/null; then
    COMPOSE_VERSION=$(docker-compose --version)
    check 0 "$COMPOSE_VERSION"
else
    echo -e "${YELLOW}⚠${NC} Docker Compose non installé (optionnel)"
fi
echo ""

# 7. Vérifier les ports
echo -e "${BLUE}7. Ports disponibles${NC}"
if command -v lsof &> /dev/null; then
    if lsof -i:8080 &> /dev/null; then
        echo -e "${YELLOW}⚠${NC} Port 8080 (backend) déjà utilisé"
    else
        check 0 "Port 8080 (backend) disponible"
    fi

    if lsof -i:5173 &> /dev/null; then
        echo -e "${YELLOW}⚠${NC} Port 5173 (frontend) déjà utilisé"
    else
        check 0 "Port 5173 (frontend) disponible"
    fi
elif command -v netstat &> /dev/null; then
    if netstat -tuln | grep :8080 &> /dev/null; then
        echo -e "${YELLOW}⚠${NC} Port 8080 (backend) déjà utilisé"
    else
        check 0 "Port 8080 (backend) disponible"
    fi

    if netstat -tuln | grep :5173 &> /dev/null; then
        echo -e "${YELLOW}⚠${NC} Port 5173 (frontend) déjà utilisé"
    else
        check 0 "Port 5173 (frontend) disponible"
    fi
else
    echo -e "${YELLOW}⚠${NC} Impossible de vérifier les ports (lsof/netstat non disponible)"
fi
echo ""

# Résumé
echo "=================================================="
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ Tout est prêt!${NC}"
    echo ""
    echo "Prochaines étapes:"
    echo ""
    echo "1. Si node_modules manquant:"
    echo -e "   ${GREEN}./setup.sh${NC}"
    echo ""
    echo "2. Lancer le projet:"
    echo -e "   ${GREEN}./dev.sh${NC}"
    echo ""
else
    echo -e "${RED}⚠ $ERRORS erreur(s) détectée(s)${NC}"
    echo ""
    echo "Lancez d'abord:"
    echo -e "   ${GREEN}./setup.sh${NC}"
    echo ""
fi
echo "=================================================="
