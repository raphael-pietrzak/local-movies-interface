// serveur express
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;


const jsonRouter = require('./routes/json');
const nextRouter = require('./routes/next');
const videoRouter = require('./routes/video');
const refreshRouter = require('./routes/refresh');


const bodyParser = require('body-parser');
const {update_progress} = require('./utils/save_to_json_file');

app.use(cors());

app.use(express.static('public'));

app.use('/json', jsonRouter);
app.use('/next', nextRouter);
app.use('/video', videoRouter);
app.use('/refresh', refreshRouter);

app.use(bodyParser.json());

// Endpoint pour les pages HTML

app.get('/', (req, res) => {
  res.sendFile('public/browse.html', { root: __dirname });
});

app.get('/watch/:SerieId/:EpisodeId', (req, res) => {
  res.sendFile('public/watch.html', { root: __dirname });
});

app.post('/videoProgress', (req, res) => {
  const { progress } = req.body;
  update_progress(progress.id, progress);
  res.status(200).send('Progression reçue avec succès.');
});


app.use((req, res) => {
  res.status(404).sendFile('public/404.html', { root: __dirname });
});




// Lancement du serveur

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})