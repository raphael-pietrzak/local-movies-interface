
const express = require('express');
const get_folder_names = require('./get_folder_names');
const {get_movie_data, get_tv_data, get_season_data, get_episode_data} = require('./moviedb');
const save_to_json_file = require('./save_to_json_file');
const download_image = require('./download');
const detectEpisodesAndSeasons = require('./detect_episodes_and_seasons');



async function refresh_json() {
    const directoryPath = '/Users/monkeyparadise/Movies';
    const folderNames = get_folder_names(directoryPath);
    console.log('Noms de dossiers :', folderNames);
    folderNames.forEach(async (folderName) => {


        const tv_show_name = folderName;
        const data = await get_tv_data(tv_show_name);
        console.log(data);


        if (data) {
            save_to_json_file(data, `/file.json`);
            
            const url = 'https://image.tmdb.org/t/p/w500/' + data.poster_path;
            await download_image(url, `../download`);
        }
    })
}

refresh_json()