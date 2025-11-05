import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import Analytics from "./components/Analytics";
import "./styles/index.css";
import "./lib/i18n";
import { registerServiceWorker } from "./utils/registerSW";
import { initSentry } from "./lib/sentry";

// Initialize monitoring
initSentry();

// Register service worker for PWA
registerServiceWorker();

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found. Ensure #root exists in index.html.");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Analytics />
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
