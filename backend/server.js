require('dotenv').config();
const app = require('./app');
const connectDB = require('./utils/db');

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`🚀 Serveur Marhaba Canada sur http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Erreur au démarrage :', err);
    process.exit(1);
  }
}

start();
