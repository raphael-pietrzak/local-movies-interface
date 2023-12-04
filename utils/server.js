const express = require('express');
const cors = require('cors');

const app = express();
const port = 5500;



app.use(cors());





app.get('/getJson', async (req, res) => {
  try {

    const filePath = './movie_info.json';
    const parsedData = await readJsonFile(filePath);

    res.json(parsedData);

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});








app.listen(port, () => {
  console.log(`Serveur en cours d'écoute sur le port ${port} : http://localhost:${port}/getJson`);
});
