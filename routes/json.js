const express = require('express');
const router = express.Router();
const readJsonFile = require('../utils/read_json');


router.get('/', async (req, res) => {
  const filePath = 'data/movie_info.json';
  const parsedData = await readJsonFile(filePath);
  res.json(parsedData);
})

router.get('/:serie_id', async (req, res) => {
  const filePath = 'data/movie_info.json';
  const parsedData = await readJsonFile(filePath);

  for (const serie in parsedData) {
    if (parsedData[serie].id === parseInt(req.params.serie_id)) {
      res.json(parsedData[serie]);
      return;
    }
  }
  res.status(404).json({ error: 'Film introuvable' });

});

router.get('/:serie_id/:episode_id', async (req, res) => {
  const episodeId = req.params.episode_id;
  const serieId = req.params.serie_id;
  const series = await readJsonFile('data/movie_info.json');
  let serie = null;

  for (const serie_name in series) {
      if (series.hasOwnProperty(serie_name)) {

          if (series[serie_name].id === parseInt(serieId)) {
              serie = series[serie_name]; 
              break;
          }
      }
  }

  if (!serie) {
      return res.status(404).end('Serie not found');
  }

  const saisons = serie.seasons;

  let currentSaison = 0;
  let currentEpisode = 0;

  for (let i = 0; i < saisons.length; i++) {
      const saison = saisons[i];
      for (let j = 0; j < saison.episodes.length; j++) {
          const episode = saison.episodes[j];
          if (episode.id === parseInt(episodeId)) {
              currentSaison = i;
              currentEpisode = j;
              break;
          }
      }
  }

  const episode = saisons[currentSaison].episodes[currentEpisode];

  res.json(episode);

});



module.exports = router;