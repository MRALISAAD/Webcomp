const express = require('express');
const app = express();
require('dotenv').config();

app.get('/', (req, res) => {
  res.send("API d’accompagnement prête 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
