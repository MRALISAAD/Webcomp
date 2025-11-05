// backend/src/middleware/notFound.js
export default function notFound(req, res, next) {
  res.status(404).json({
    success: false,
    error: "Ressource non trouvée",
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
  });
}
