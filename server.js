const express = require('express');
const app = express();

app.use(express.json());

let articles = [];

// accueil
app.get('/', (req, res) => {
  res.send("Mon API fonctionne !");
});

// créer
app.post('/articles', (req, res) => {
  const article = req.body;
  articles.push(article);
  res.json(article);
});

// lire
app.get('/articles', (req, res) => {
  res.json(articles);
});

// modifier
app.put('/articles/:id', (req, res) => {
  const id = req.params.id;
  articles[id] = req.body;
  res.json(articles[id]);
});

// supprimer
app.delete('/articles/:id', (req, res) => {
  const id = req.params.id;
  articles.splice(id, 1);
  res.json({ message: "Supprimé" });
});

// rechercher
app.get('/search', (req, res) => {
  const query = req.query.q.toLowerCase();

  const result = articles.filter(article =>
    article.title.toLowerCase().includes(query) ||
    article.content.toLowerCase().includes(query)
  );

  res.json(result);
});

app.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000");
});