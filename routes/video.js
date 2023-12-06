
const router = require('express').Router();
const fs = require('fs');
const readJsonFile = require('../utils/read_json');


router.get('/:videoId(\\d+)', (req, res) => {
  const videoId = req.params.videoId;
  const rawdata = fs.readFileSync('data/movies_ids.json');
  const jsonData = JSON.parse(rawdata);

  const videoPath = jsonData[videoId];
  
  if (!videoPath) {
    return res.status(404).end('Video not found');
  }

  // Utiliser le module fs pour vérifier si la vidéo existe
  fs.stat(videoPath, (err, stats) => {
      if (err) {
          console.error('Error accessing video file:', err);
          return res.status(500).end('Internal Server Error');
      }

    // Configurer les en-têtes pour permettre la diffusion de vidéos
    const range = req.headers.range;
    const fileSize = stats.size;

    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };

   
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      head['Content-Range'] = `bytes ${start}-${end}/${fileSize}`;
      head['Accept-Ranges'] = 'bytes';
      head['Content-Length'] = end - start + 1;

      res.writeHead(206, head);
      fs.createReadStream(videoPath, { start, end }).pipe(res);
    } else {
      res.writeHead(200, head);
      fs.createReadStream(videoPath).pipe(res);
    }
  });
});

router.get('/progress', async (req, res) => {
  const filePath = 'data/current_episode.json';
  const parsedData = await readJsonFile(filePath);
  res.json(parsedData);
})


module.exports = router;
  
  