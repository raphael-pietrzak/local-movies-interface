const axios = require('axios');
const readline = require('readline-sync');

const apiKey = 'API-KEY';
const apiMovieUrl = 'https://api.themoviedb.org/3/search/movie';
const apiTvUrl = 'https://api.themoviedb.org/3/search/tv';


const language = 'fr-FR';

async function get_movie_data(movieName) {
  try {
    const params = {
      api_key: apiKey,
      query: movieName,
      language: language,
    };
    const response = await axios.get('https://api.themoviedb.org/3/search/movie', { params });
    return response[0];
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de la série :', error.message);
    return null;
  }
}

async function getSerieDetails(serieId) {
  try {
    const params = {
      api_key: apiKey,
      language: language,
    }
    const response = await axios.get(`https://api.themoviedb.org/3/tv/${serieId}`, { params });
    return response.data;

  } catch (error) {
    console.error('Erreur lors de la récupération des détails de la série :', error.message);
    return null;
  }
}



async function get_tv_data(tvName) {
  try {
    const params = {
      api_key: apiKey,
      query: tvName,
      language: language,
    };
      
      const response = await axios.get('https://api.themoviedb.org/3/search/tv', { params });
      const tv = response.data.results[0];
      return tv;
    } catch (error) {
      console.error('Erreur lors de la recherche de la série :', error.message);
      return null;
    }
  
}

async function get_season_data(serieId, seasonNumber) {
  try {
    const params = {
      api_key: apiKey,
      language: language,
    };
        
    const response = await axios.get(`https://api.themoviedb.org/3/tv/${serieId}/season/${seasonNumber}`, { params });
    const season = response.data;
    return season;
  } catch (error) {
    console.error('Erreur lors de la recherche de la saison :', seasonNumber, error.message);
    return null;
  }
  
}

async function get_episode_data(tvId, seasonNumber, episodeNumber) {
  try {
    const params = {
      api_key: apiKey,
      language: language,
    };
    
    const response = await axios.get(`https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}`, { params });
    const episode = response.data;
    return episode;
  } catch (error) {
    console.error('Erreur lors de la recherche de l épisode :', error.message);
    return null;
  }

    
}



module.exports = {
    get_movie_data,
    get_tv_data,
    get_season_data,
    get_episode_data,
    getSerieDetails
}