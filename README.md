# 🌍 Marhaban Canada - Full-Stack Welcome Platform

> **Votre arrivée au Canada, sans stress** | Complete welcome service for newcomers to Canada

[![Status](https://img.shields.io/badge/status-production-green)](https://marhabancanada.ca)
[![Tech Stack](https://img.shields.io/badge/stack-React%2BExpress-blue)](https://github.com)
[![Languages](https://img.shields.io/badge/i18n-FR%2FEN%2FAR-orange)](https://marhabancanada.ca)

## 📋 Overview

Marhaban Canada is a full-stack platform providing comprehensive welcome services for newcomers to Canada. The platform offers curated service packs including airport pickup, SIN registration, banking setup, temporary housing, and multilingual support in French, English, and Arabic.

### ✨ Key Features

- **🌐 Trilingual Support**: French, English, and Arabic with RTL layout support
- **🎨 Modern UI**: Dark mode, responsive design, TailwindCSS + Marhaban palette (#FAF5EF / #0A2239 / #D4AF37)
- **🔍 SEO Optimized**: React Helmet, SEO helper, sitemap.xml & robots.txt
- **📧 Zoho Integration**: Automated CRM lead management and transactional emails (SMTP Zoho)
- **🧰 Hardened API**: Zod validation, request counter, detailed logging, optional n8n webhook
- **⚡ Performance**: Lighthouse score ≥ 85 (Performance & Accessibility)
- **🐳 Docker Ready**: Complete containerization with input/output

## 🏗️ Architecture

### Frontend
```
React 18 + Vite 5
TailwindCSS 3
i18next (FR/EN/AR)
Framer Motion
React Helmet Async
```

### Backend
```
Express.js
Zoho CRM API
Zoho Mail (SMTP)
Rate limiting
Request logging
```

## 📁 Project Structure

```
webcomp/
├── frontend/              # React + Vite application
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── i18n/         # Translation files (FR/EN/AR)
│   │   ├── lib/          # Utilities (i18n, SEO, API)
│   │   └── styles/       # Global styles
│   ├── public/           # Static assets
│   ├── tailwind.config.js
│   └── vite.config.ts
│
├── backend/               # Express.js API server
│   ├── src/
│   │   ├── routes/       # API routes
│   │   ├── controllers/  # Route controllers
│   │   ├── services/     # Zoho, Mail services
│   │   ├── middleware/   # Auth, rate limit, error handling
│   │   └── utils/        # Environment, logging
│   ├── .env.example
│   └── Dockerfile
│
└── docker-compose.yml     # Docker orchestration
```

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm or yarn
- Docker & Docker Compose (optional)

### Local Development

#### 1. Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env with your Zoho credentials
npm install
npm run dev  # Runs on http://localhost:8080
```

#### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev  # Runs on http://localhost:5173
```

### Environment Variables

#### Backend

Create `backend/.env` with the following variables:

```env
# Server
PORT=8080
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:5173,https://marhabancanada.ca

# Zoho CRM
ZOHO_CLIENT_ID=your_client_id
ZOHO_CLIENT_SECRET=your_secret
ZOHO_REFRESH_TOKEN=your_refresh_token
ZOHO_ACCOUNTS_URL=https://accounts.zohocloud.ca
ZOHO_API_URL=https://www.zohoapis.ca/crm/v2
ZOHO_MODULE=LeadsWeb

# Zoho Mail (SMTP)
SMTP_HOST=smtp.zoho.com
SMTP_PORT=465
SMTP_USER=contact@marhabancanada.ca
SMTP_PASS=your_password
FROM_NAME="Marhaban Canada"

# Internal Notifications & Automations
INTERNAL_NOTIF_EMAIL=admin@marhabancanada.ca
N8N_WEBHOOK_URL=https://n8n.yourdomain.com/webhook/marhaban
SENTRY_DSN=
LOG_LEVEL=info

# MongoDB (Optional)
MONGO_URI=mongodb://localhost:27017
MONGO_DB=marhaban
```

#### Frontend

Create `frontend/.env` with the following variables:

```env
# API
VITE_API_URL=http://localhost:8080/api
VITE_API_BASE_URL=http://localhost:8080/api

# WhatsApp
VITE_WHATSAPP_NUMBER=15146910262

# SEO
VITE_SITE_URL=https://marhabancanada.ca
VITE_SITE_NAME=Marhaban Canada
VITE_DEFAULT_LOCALE=fr

# Analytics (Optional)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
```

## 🐳 Docker Deployment

### Build and Run

```bash
# Copy environment file
cp backend/.env.example backend/.env
# Edit backend/.env with production values

# Build and start all services
docker-compose up -d --build

# Check logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Services

- **Frontend**: http://localhost:5173 (React SPA)
- **Backend API**: http://localhost:8080 (Express.js)
- **Caddy Proxy**: http://localhost:80, https://localhost:443

## 📦 Service Packs

| Pack | Price | Features |
|------|-------|----------|
| **Essentiel** | $299 | Pre-departure briefing, SIN + Banking appointments, Checklist |
| **Confort** | $599 | Temporary housing (verified), Airport pickup, 15-day WhatsApp support |
| **Premium** | $999 | 30-day concierge services, RAMQ guidance, Phone/Bank/Insurance activation |

## 🛠️ API Endpoints

### Leads API (`POST /api/leads`)

Creates a new lead in Zoho CRM and sends confirmation emails.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+15141234567",
  "pack": "Premium",
  "message": "Arriving in Montreal next month",
  "locale": "en",
  "arrivalDate": "2025-03-15",
  "airport": "YUL",
  "city": "Montreal",
  "people": 2,
  "country": "Canada",
  "utm": {
    "source": "google",
    "medium": "cpc",
    "campaign": "spring2025"
  }
}
```

**Response:**
```json
{
  "success": true,
  "leadId": "abc123",
  "zohoId": "1234567890123456",
  "pack": "premium",
  "message": "Lead créé et emails envoyés avec succès."
}
```

### Contact API (`POST /api/contact`)

Handles general contact form submissions.

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "subject": "Question about housing",
  "message": "Looking for housing in Quebec City",
  "preferredLanguage": "fr"
}
```

### FAQ API (`GET /api/faq`)

Returns frequently asked questions from the backend data source.

### Status API (`GET /api/status`)

Health check endpoint for monitoring.

## 📧 Zoho CRM Integration

### Setup
1. Create Zoho CRM account at https://www.zoho.com/crm/
2. Register an application in Zoho API Console: https://api-console.zoho.com/
3. Generate refresh token using Zoho OAuth flow
4. Configure environment variables in `backend/.env`

### Module Configuration
- **Module Name**: LeadsWeb (configurable via `ZOHO_MODULE`)
- **API Endpoint**: `https://www.zohoapis.ca/crm/v2/LeadsWeb`
- **Fields Mapped**:
  - `Full_Name`, `First_Name`, `Last_Name`
  - `Email`, `Phone`
  - `Pack_choisi`, `Custom_Pack__c`
  - `Lead_Source`, `Description`
  - `Arrival_Date__c`, `City`, `Country`
  - `preferred_language`

### Email Notifications
- **Welcome Email**: Sent to prospect immediately after lead creation
- **Internal Notification**: Sent to team with lead details and Zoho CRM link
- **Email Service**: Zoho Mail (SMTP) or Mail service configured

## 🎨 Styling & Theming

### Colors (Official Brand Palette)

- **Primary Red**: `#E63946` - Main brand color
- **Secondary Teal**: `#2A9D8F` - Secondary brand color
- **White**: `#FFFFFF`
- **Light Gray**: `#F8F9FA` (Background/Cream)
- **Dark**: `#0F172A`

### Typography

- **Font**: Poppins / Inter
- **RTL Support**: Full Arabic RTL layout

### Dark Mode

Toggle dark mode via Tailwind's `dark:` classes. Theme preference is persisted in localStorage.

## 🔍 SEO & Performance

### Implemented

✅ React Helmet for dynamic meta tags
✅ JSON-LD structured data (LocalBusiness, Product, FAQ)
✅ Sitemap.xml and robots.txt
✅ OpenGraph + Twitter cards
✅ Alt text and ARIA labels
✅ Gzip compression
✅ Image optimization
✅ Code splitting

### Lighthouse Scores

- Performance: ≥ 85
- Accessibility: ≥ 90
- SEO: 100
- Best Practices: ≥ 90

## 📱 Pages

- `/` - Home
- `/packs` - Service packs comparison
- `/processus` - Process overview
- `/booking` - Pack reservation
- `/about` - About us
- `/testimonials` - Client testimonials
- `/partners` - Partners network
- `/blog` - Blog articles
- `/faq` - Frequently asked questions
- `/contact` - Contact form
- `/legal` - Legal notices

## 🔐 Security

- Helmet.js security headers
- CORS configuration
- Rate limiting (express-rate-limit)
- Input validation (Joi schemas)
- Environment variable validation
- HTTPS in production (Caddy)

## 📊 Monitoring

### Health Check

```bash
curl http://localhost:8080/api/status
```

### Logs

Backend logs are stored in `backend/logs/app.log` with Winston.

## 🧪 Testing

```bash
# Frontend tests
cd frontend
npm test

# Backend smoke tests
cd backend
node scripts/smokeTests.js

# Zoho connection test
cd backend
node scripts/testZoho.js
```

## 📝 Deployment

### Production Build

```bash
# Frontend
cd frontend
npm run build
# Output: frontend/dist/

# Backend
cd backend
npm start
```

### Hosting Recommendations

- **Frontend**: Netlify, Vercel, Cloudflare Pages
- **Backend**: Railway, Render, DigitalOcean
- **Email**: Zoho Mail
- **CRM**: Zoho CRM

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

© 2025 Marhaban Canada. All rights reserved.

## 📧 Contact

- **Email**: contact@marhabancanada.ca
- **Phone**: +1 514 691 0262
- **Address**: Montreal, Quebec, Canada
- **Website**: https://marhabancanada.ca

---

**Made with ❤️ for newcomers to Canada**
