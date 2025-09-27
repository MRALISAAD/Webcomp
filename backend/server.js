// Page d’accueil (infos générales)
app.get('/api/accueil', (req, res) => {
  res.json({
    titre: "Bienvenue Canada",
    message: "De l'aéroport à l'appartement, sans stress 🚀"
  });
});

// Page Étudier
app.get('/api/etudier', (req, res) => {
  res.json({
    titre: "Étudier au Canada",
    contenu: "Infos sur les écoles, universités, démarches d’inscription, RAMQ étudiant..."
  });
});

// Page Travailler
app.get('/api/travailler', (req, res) => {
  res.json({
    titre: "Travailler au Canada",
    contenu: "Infos sur permis de travail, recherche d’emploi, intégration professionnelle..."
  });
});

// Page Immigrer
app.get('/api/immigrer', (req, res) => {
  res.json({
    titre: "Immigrer au Canada",
    contenu: "Explications sur les programmes d’immigration, CSQ, résidence permanente..."
  });
});

// Page Vie pratique
app.get('/api/vie-pratique', (req, res) => {
  res.json({
    titre: "Vie pratique",
    contenu: "Banques, téléphonie, logement, transport, santé..."
  });
});

// Page Communauté
app.get('/api/communaute', (req, res) => {
  res.json({
    titre: "Communauté",
    contenu: "Groupes, associations, événements pour nouveaux arrivants..."
  });
});

// Formulaire de contact (POST)
app.post('/api/contact', (req, res) => {
  const { nom, email, telephone, message } = req.body;
  res.json({
    success: true,
    data: { nom, email, telephone, message },
    info: "Demande reçue, merci ✅"
  });
});
