const fs = require('fs');
const path = require('path');
const get_folder_names = require('./get_folder_names');

function detectEpisodesAndSeasons(directoryPath) {
  try {
    const seriesContent = fs.readdirSync(directoryPath);

    const seasons = seriesContent.filter(item => {
      const itemPath = path.join(directoryPath, item);
      return fs.statSync(itemPath).isDirectory() && !item.startsWith('.') && (item.toLowerCase().startsWith('saison') || item.toLowerCase().startsWith('season'));
    });

    const episodes = seriesContent.filter(item => {
      const itemPath = path.join(directoryPath, item);
      return fs.statSync(itemPath).isFile() && (item.endsWith('.mp4') || item.endsWith('.mkv') || item.endsWith('.avi')) && !item.startsWith('.');
    });

    return {
      hasSeasons: seasons.length > 0,
      numberOfSeasons: seasons.length,
      seasons_path: seasons,
      hasEpisodes: episodes.length > 0,
      numberOfEpisodes: episodes.length,
      episodes_path : episodes,
    };
  } catch (error) {
    console.error('Erreur lors de la détection des épisodes et des saisons :', error.message);
    return null;
  }
}


function get_episodes_paths(serie_path){
  // Exemple d'utilisation
  const seriesPath = serie_path;
  const detectionResult = detectEpisodesAndSeasons(seriesPath);
  const paths = {};

  if (detectionResult) {
    if (detectionResult.numberOfSeasons >0){
      for (let j = 0; j < detectionResult.seasons_path.length; j++) {
        const season = detectionResult.seasons_path[j];
        const fullPath = seriesPath + '/' + season;
        const episodes = detectEpisodesAndSeasons(fullPath);
        paths[season] = episodes.episodes_path;
      };
      paths['dir'] = true;
    } else if (detectionResult.numberOfEpisodes >0) {
      paths['Saison 1'] = detectionResult.episodes_path;
      paths['dir'] = false;
    }
    return paths;
  } else {
    
  }
}

function get_full_paths(series_path){
  const paths = {}
  const series = get_folder_names(series_path)
  for (let i = 0; i < series.length; i++) {
    const serie = series[i];
    const path = get_episodes_paths(series_path + serie)
    paths[serie] = path

  }
  return paths;

}


//   const series_path = '/Users/monkeyparadise/Movies/'
// console.log(get_full_paths(series_path))


module.exports = get_full_paths; 