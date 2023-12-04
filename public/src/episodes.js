

async function fetchData() {
    let progress;
    let serie;
    let episode;

    const serie_id = window.location.pathname.split('/')[2];
    const episode_id = window.location.pathname.split('/')[3];

    progress = await fetchSerieProgress(serie_id);
    serie = await fetchSerieData(serie_id);
    episode = await fetchEpisodeData(serie_id, episode_id);

    return {progress, serie, episode};

    async function fetchSerieProgress(serie_id) {
        const response = await fetch('/video/progress');
        const all_progress = await response.json();
        progress = all_progress[serie_id];
        return progress;
    }
    
    async function fetchSerieData(serie_id){
        const response = await fetch(`/json/${serie_id}`);
        const serie = await response.json();
        return serie;
    }
    
    async function fetchEpisodeData(serie_id, episode_id){
        const response = await fetch(`/json/${serie_id}/${episode_id}`);
        const episode = await response.json();
        return episode;
    }
}

function getCurrentEpisode(serie) {
    let episode_id = window.location.pathname.split('/')[3];
    let current_season = 0
    let current_episode = 0

    for (let i = 0; i < serie.seasons.length; i++) {
        let season = serie.seasons[i];
        for (let j = 0; j < season.episodes.length; j++) {
            let episode = season.episodes[j];
            if (episode.id == episode_id) {
                current_season = i;
                current_episode = j;
                break;
            }
        }
    }
    return {current_season, current_episode};
}


async function loadEpisodeSelection() {
    const {progress, serie, episode} = await fetchData();
    let serie_name = document.querySelector(".serie-name h3");
    serie_name.innerHTML = serie.title;  

    let saison_list = document.querySelector(".saison-list");


    for (let i = 0; i < serie.seasons.length; i++) {
        let season = serie.seasons[i];
    
        let season_html = `
        <div class="season">
            <div class="select-icon"><img src="/assets/select-icon.svg" alt=""></div>
            <span>${season.name}</span>
            <div class="go-icon"><img src="/assets/go-icon.svg" alt=""></div>
        </div>`;
        saison_list.innerHTML += season_html;
    
    }

    const {current_season, current_episode} = getCurrentEpisode(serie); 


    let seasons_collection = document.getElementsByClassName("season");
    const seasons = Array.from(seasons_collection);


    for (let season of seasons) {
        const season_name = season.querySelector("span");
        const name = season_name.innerHTML;
        if (name == serie.seasons[current_season].name) {
            season.classList.add("selected");
            season.classList.add("active");
        }
    }


    const episodes_menu = document.querySelector(".episodes-menu"); 
    let seasons_menu = document.querySelector(".seasons-menu");


    for (let i = 0; i < seasons.length; i++) {
        let season = seasons[i];
        season.addEventListener("click", () => {
            seasons.forEach(element => {
                element.classList.remove("selected");
            });
            season.classList.add("selected");
            episodes_menu.style.display = "flex";
            seasons_menu.style.display = "none";
            loadEpisodes(i);
        })
    }

    loadEpisodes(current_season);


    function loadEpisodes(season_number) {
    
        let episodes_list = document.querySelector(".episodes-list");
        episodes_list.innerHTML = "";
        let season = serie.seasons[season_number];

        for (let episode of season.episodes) {
            let episodes_html = `
            <div class="episode" id="${episode.id}">
                <span class="episode-number">${episode.episode_number}</span>
                <span class="episode-title">${episode.name}</span>
                <div class="progress"><progress value="0" max="100"></progress></div>
            </div>`;
            episodes_list.innerHTML += episodes_html;


            // if (episode.id == progress.episode_id) {
            //     let progress_bar = document.querySelector(".progress progress");
            //     progress_bar.value = progress.progress;
            // }
        }

        const episodes_collection = document.getElementsByClassName("episode");
        const episodes = Array.from(episodes_collection);

        for (let i = 0; i < episodes.length; i++) {
            let episode = episodes[i];

            episode.addEventListener("click", () => {
                document.location.href = `/watch/${serie.id}/${episode.id}`;
            })              
        }


    
        const episodes_title = document.querySelector(".episodes-title");
        const season_name = document.querySelector(".episodes-title h3");
        season_name.innerHTML = season.name;
    
        episodes_title.addEventListener("click", () => {
            episodes_menu.style.display = "none";
            seasons_menu.style.display = "flex";
    
        });


    
    }
    
}

loadEpisodeSelection();




// current episode view
