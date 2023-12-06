

function handleProgressBar() {
    const video = document.querySelector('video');
    const timeline = document.querySelector('.timeline');
    const progress_bar_red = document.querySelector('.progress-bar-red');
    const progress_bar_cursor = document.querySelector('.progress-bar-cursor');
    const time_remaining = document.querySelector('.time-remaining');

    let isDragging = false;

    timeline.addEventListener('mousedown', (event) => {
        isDragging = true;
        updateProgress(event);
    });

    document.addEventListener('mousemove', (event) => {
        if (isDragging) {
            updateProgress(event);
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    video.addEventListener('timeupdate', () => {
        const percent = (video.currentTime / video.duration) * 100;
        progress_bar_red.style.width = `${percent}%`;
        progress_bar_cursor.style.left = `${percent}%`;
        timeRemainingUpdate();
    })

    function updateProgress(event) {
        const timeline_width = window.getComputedStyle(timeline).width;
        const offset = event.pageX - timeline.offsetLeft;
        let progress = offset / parseInt(timeline_width) * 100;
        (progress > 100) ? progress = 100 : (progress < 0) ? progress = 0 : progress;
        progress_bar_red.style.width = `${progress}%`;
        progress_bar_cursor.style.left = `${progress}%`;
        video.currentTime = video.duration * (progress / 100);
        timeRemainingUpdate();
    }

    function timeRemainingUpdate() {
        time_remaining.textContent = formatTime(video.duration - video.currentTime);
        if (video.currentTime >= video.duration) {
            let nextEpisode = document.querySelector('.next-episode');
            nextEpisode.click();
        }
    }

    function formatTime(time) {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time - minutes * 60);
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        return `${minutes}:${seconds}`;
    }

}

function handlePlayPause(video) {
    const play_pause = document.querySelector('.play-pause');

    play_pause.addEventListener('click', togglePlayPause);

    document.addEventListener('click', function(event) {
        var overlay = document.querySelector('.bottom-container');
        var isClickInsideOverlay = overlay.contains(event.target);
        const home_icon = document.querySelector('.home-icon');
        const select_episode_box = document.querySelector('.select-episode-box');
        const isClickInsideSelectEpisodeBox = select_episode_box.contains(event.target);
        var isClickInsideHomeIcon = home_icon.contains(event.target);
        if (!isClickInsideOverlay && !isClickInsideHomeIcon && !isClickInsideSelectEpisodeBox) {
            togglePlayPause();
        }
    });

    function togglePlayPause(){
        const video = document.querySelector('video');
        const play = document.querySelector('.play-icon');
        const pause = document.querySelector('.pause-icon');
        PlayPauseCenter();
        if (video.paused) {
            video.play();
            play.style.display = 'none';
            pause.style.display = 'block';
        } else {
            video.pause();
            play.style.display = 'block';
            pause.style.display = 'none';
        }
    } 


    function PlayPauseCenter() {
        const playPauseContainer = document.querySelector('.play-pause-container');
        const playIconCenter = document.querySelector('.play-icon-center');
        const pauseIconCenter = document.querySelector('.pause-icon-center');
    
        playPauseContainer.classList.add('show-container');
    
        if (video.paused) {
            playIconCenter.style.display = 'block';
            pauseIconCenter.style.display = 'none';
        } else {
            playIconCenter.style.display = 'none';
            pauseIconCenter.style.display = 'block';
        }
        
        playPauseContainer.style.transform = 'scale(2)'; // Increase the scale of the container
        playPauseContainer.style.opacity = '0';
    
        setTimeout(() => {
            playPauseContainer.classList.remove('show-container');
            playPauseContainer.style.transform = 'scale(1)';
            playPauseContainer.style.opacity = '1';
        }, 500);  
    
    }
}

function handleBackForward() {
    const video = document.querySelector('video');
    const back = document.querySelector('.back');
    const forward = document.querySelector('.forward');

    back.addEventListener('click', (event) => {
        event.stopPropagation();
        video.currentTime -= 10;
    })

    forward.addEventListener('click', (event) => {
        event.stopPropagation();
        video.currentTime += 10;
    })
}

function handleSound() {
    const video = document.querySelector('video');
    const volume = document.querySelector('.volume');
    const volume_icon = document.querySelector('.volume-icon');
    const mute_icon = document.querySelector('.mute-icon');

    volume.addEventListener('click', (event) => {
        event.stopPropagation();
        if (video.muted) {
            video.muted = false;
            volume_icon.style.display = 'block';
            mute_icon.style.display = 'none';
        } else {
            video.muted = true;
            volume_icon.style.display = 'none';
            mute_icon.style.display = 'block';
        }
    })
}

function handleFullScreen(){
    const video = document.querySelector('video');
    const fullscreen = document.querySelector('.fullscreen');
    const fullscreen_icon = document.querySelector('.fullscreen-icon');
    const minimize_icon = document.querySelector('.minimize-icon');

    fullscreen.addEventListener('click', () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
            fullscreen_icon.style.display = 'block';
            minimize_icon.style.display = 'none';
        } else {
            const element = document.documentElement;
            element.requestFullscreen();
            fullscreen_icon.style.display = 'none';
            minimize_icon.style.display = 'block';
        }
    });
};

function handleKeyboard() {
    const play_pause = document.querySelector('.play-pause');
    const back = document.querySelector('.back');
    const forward = document.querySelector('.forward');
    const volume = document.querySelector('.volume');   
    const fullscreen = document.querySelector('.fullscreen');

    document.addEventListener('keydown', (event) => {

        if (event.key === ' ') {
            play_pause.click();
        }
        if (event.key === 'ArrowLeft') {
            back.click();
        }
        if (event.key === 'ArrowRight') {
            forward.click();
        }
        if (event.key === 'm') {
            volume.click();
        }
        if (event.key === 'f') {
            fullscreen.click();
        }
    })
}

function handleOverlayVisibility(){
    var timer = null;
    timer = resetTimer(timer)
    document.addEventListener('mousemove', () => { timer = resetTimer(timer); });
    document.addEventListener('keypress', () => { timer = resetTimer(timer); });
    document.addEventListener('click', () => { timer = resetTimer(timer); });
    document.addEventListener('scroll', () => { timer = resetTimer(timer); });

    // const select_episode_box = document.querySelector('.episodes-icon');
    // select_episode_box.addEventListener('mouseover', () => {
    //     timer = resetTimer(timer);
    // });

        
    function resetTimer(timer) {
        clearTimeout(timer);
        document.body.style.cursor = 'default';

        const overlay = document.querySelector('.container');
        overlay.style.display = "flex";

        const new_timer = setTimeout(() => {
            overlay.style.display = "none"; 
            document.body.style.cursor = 'none';
        }, 3000);
        return new_timer;
    }
    
}

function handleEpisodeSelection() {
    const select_episode_box = document.querySelector('.select-episode-box');
    const episodes_icon = document.querySelector('.episodes-icon');
    const timeline_bar = document.querySelector('.timeline-bar');

    episodes_icon.addEventListener('mouseover', () => {
        select_episode_box.style.display = 'flex';
        timeline_bar.style.display = 'none';
    });

    select_episode_box.addEventListener('mouseover', () => {
        select_episode_box.style.display = 'flex';
        timeline_bar.style.display = 'none';
    });

    select_episode_box.addEventListener('mouseout', () => {
        select_episode_box.style.display = 'none';
        timeline_bar.style.display = 'flex';
    });
}



// server
function handleNextEpisode() {
    const nextEpisode = document.querySelector('.next-episode');
    const serie_id = window.location.pathname.split('/')[2];
    const episode_id = window.location.pathname.split('/')[3];

    nextEpisode.addEventListener('click', () => {
        window.location.href = `http://localhost:3000/next/${serie_id}/${episode_id}`;
    })
}

function handleBackHome() {
    const backHome = document.querySelector('.home-icon');
    backHome.addEventListener('click', () => {
        window.location.href = 'http://localhost:3000';
    })
}

function handleSaveProgress() {
    const video = document.querySelector('video');
    const serie_id = window.location.pathname.split('/')[2];
    const episode_id = window.location.pathname.split('/')[3];

    sendProgress(video, serie_id, episode_id);
    setInterval(() => sendProgress(video, serie_id, episode_id), 5000);   
    
    function sendProgress(video, serie_id, episode_id) {
        const isFullscreen = document.fullscreenElement!==null;
        const progress = {id: serie_id, episode_id : episode_id, progression: video.currentTime, fullscreen: isFullscreen};

        fetch('/videoProgress', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ progress }),
        })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Erreur lors de l\'envoi de la progression:', error));
    }
}




// fetch
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

async function loadVideo() {
    const {progress, serie, episode} = await fetchData();

    let video_player = document.querySelector('.video-player');
    
    video_player.innerHTML = `<video autoplay><source src="/video/${episode.id}" type="video/mp4"></video>`;
    
    let time_code = 0;
    if (progress && parseInt(progress.episode_id) === parseInt(episode.id)) {
        time_code = progress.progression;
    }

    let video = document.querySelector('video');
    console.log(video.textTracks.length);
    video.currentTime = time_code;


    let episode_title = document.querySelector('.episode-label');
    let episode_number = document.querySelector('.episode-num');
    let episode_name = document.querySelector('.episode-name');

    episode_title.textContent = serie.title;
    episode_number.textContent = 'E' + episode.episode_number;
    episode_name.textContent = episode.name;

    return video;    
}




async function addVideoEvents(){
    // fetch
    const video = await loadVideo();
    
    // front
    handlePlayPause(video);
    handleProgressBar();
    handleBackForward();
    handleSound();
    handleFullScreen();
    handleKeyboard();
    handleOverlayVisibility();
    handleEpisodeSelection();

    // server
    handleNextEpisode();
    handleBackHome();
    handleSaveProgress();

}


// test
addVideoEvents();

// export { addVideoEvents };


