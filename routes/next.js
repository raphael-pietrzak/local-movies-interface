const router = require('express').Router();
const readJsonFile = require('../utils/read_json');
const { update_progress } = require('../utils/save_to_json_file');


router.get('/:SerieId', async (req, res) => {

    console.log("BROWSE CLICKED");

    const serieId = req.params.SerieId;
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

    let episodeId = saisons[0].episodes[0].id;

    const progress = await readJsonFile('data/current_episode.json');

    console.log(serieId, progress) 
    if (progress[serieId]) {
        episodeId = progress[serieId].episode_id;
    }


    return res.redirect(`/watch/${serieId}/${episodeId}`);

})

router.get('/change/:SerieId/:EpisodeId', (req, res) => {

    console.log("CHANGE CLICKED");

    const serieId = req.params.SerieId;
    const episodeId = req.params.EpisodeId;

    return res.redirect(`/watch/${serieId}/${episodeId}`);
})


router.get('/:SerieId/:EpisodeId', async (req, res) => {


    console.log("WATCH CLICKED");

    const serieId = req.params.SerieId;
    let episodeId = req.params.EpisodeId;

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

    currentEpisode++;
    if (currentEpisode >= saisons[currentSaison].episodes.length) {
        currentEpisode = 0;
        currentSaison++;
        if (currentSaison >= saisons.length) {
            update_progress(serieId, {
                id: serieId,
                episode_id: 0,
                progression: 0
            })
            return res.status(404).end('No next episode');
        }
    }                   

    episodeId = saisons[currentSaison].episodes[currentEpisode].id;


    // update_progress(serieId, currentSaison, currentEpisode);

    return res.redirect(`/watch/${serieId}/${episodeId}`);


})


module.exports = router