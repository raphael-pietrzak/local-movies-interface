const {get_movie_data, get_tv_data, get_season_data, get_episode_data, getSerieDetails} = require('./moviedb');
const get_folder_names = require('./get_folder_names')
const {saveToJsonFile} = require('./save_to_json_file')
const get_full_paths = require('./detect_episodes_and_seasons')
const config = require('../config')

async function build_data(name) {

    const serie = await get_tv_data(name);
    if (!serie){
        return null
    }
    serie_id = serie.id

    const serie_details = await getSerieDetails(serie_id)

    if (!serie_details){
        return null
    }
    
    const number_of_seasons = serie_details.number_of_seasons
    
    const json_data = {
        "id" : serie.id,
        "title" : serie_details.name,
        "poster_path" : serie_details.poster_path,
        "number_of_seasons" : serie_details.number_of_seasons,
        "number_of_episodes" : serie_details.number_of_episodes,
        "seasons" : await build_saison(serie_details, number_of_seasons)
    }
    return json_data
    
}


async function build_saison(data, number_of_seasons) {
    const seasons = []
    const start = data.seasons.length - number_of_seasons
    for (i = 1; i <= number_of_seasons ; i++) {
        const season_data = data.seasons[i-1 + start]
        const season_data_details = await get_season_data(data.id, i)
        const season = {
            "id" : season_data.id,
            "name" : season_data.name,
            "season_number" : season_data.season_number,
            "episode_count" : season_data_details.episodes.length,
            "poster_path" :  season_data.poster_path,
            "episodes" : await build_episode(season_data_details, season_data.episode_count)
        
        }
        seasons.push(season)

    }
    // console.log(seasons)
    return seasons
}

async function build_episode(data) {
    const episodes = []
    for (j = 0; j < data.episodes.length; j++) {
        const episode_data = data.episodes[j]
        // console.log(j)
        const episode = {
            "id" : episode_data.id,
            "name" : episode_data.name,
            "overview" : episode_data.overview,
            "season_number" : episode_data.season_number,
            "episode_number" : episode_data.episode_number,
            "still_path" : episode_data.still_path
        }
        episodes.push(episode)
    }
    // console.log(episodes)
    return episodes
}

// test
async function test() {
    const folder_series_path = config.seriesPath
    const folders = get_folder_names(folder_series_path)
    // console.log(folders)
    const data = {}
    const movies_ids = {}
    for (let i = 0; i < folders.length; i++) {
        const folder = folders[i];
        const current_show= await build_data(folder);

        if (!current_show){
            continue
        }
        
        desktop_tree = get_full_paths(folder_series_path )
        // console.log(desktop_tree)
        let saison_index = 0
        for (const season in desktop_tree[folder]) {

            for (const episode in desktop_tree[folder][season]) {
                const has_dir = desktop_tree[folder]['dir']
                let path = folder_series_path + folder + '/' + season + '/' + desktop_tree[folder][season][episode]
                if (!has_dir){
                    path = folder_series_path + folder + '/' + desktop_tree[folder][season][episode]
                }
                current_show['seasons'][saison_index]['episodes'][episode]['desktop_path'] = path
                movies_ids[current_show['seasons'][saison_index]['episodes'][episode].id] = path
            }
            
            saison_index += 1
        }
        
        data[folder] = current_show
          
    }
    saveToJsonFile('data/movies_ids.json', movies_ids)
    saveToJsonFile('data/movie_info.json', data)

}

// add file path to episode


// test()


module.exports = {
    test
}