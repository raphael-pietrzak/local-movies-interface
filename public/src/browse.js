


var movieSquaresContainer = document.getElementsByClassName('musho-main-frame-cards-grid')[0];


function fetchMovieData() {
    return fetch('http://localhost:3000/json')  // Assurez-vous que le chemin correspond à votre API
        .then(response => response.json())
        .then(data => data);
}

async function fetchCurrentEpisode(id) {
    const response = await fetch('/video/progress');
    const currentEpisode = await response.json();
    return currentEpisode[id];
}

async function fetchSerieData(id){
    const response = await fetch(`/json/${id}`);
    const serie = await response.json();
    return serie;
}


async function creerDivsPourImages() {
    let data = await fetchMovieData();

    console.log(data);  // Déboguer pour voir la structure de data
    for (const [key, value] of Object.entries(data)) {
        const movieSquare = document.createElement('div');
        movieSquare.className = 'musho-main-frame-feature-card';

        movieSquare.style.backgroundImage = "url('https://image.tmdb.org/t/p/w500" + value['poster_path'] + "')";


        movieSquare.addEventListener('click', () => {
            window.location.href = `http://localhost:3000/next/${key}`;
        })

        movieSquaresContainer.appendChild(movieSquare);
    }

}


creerDivsPourImages();

// http://localhost:3000/