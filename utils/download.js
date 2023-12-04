const axios = require('axios');
const fs = require('fs');


function downloadImage(url, folder) {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder);
    }

    const image_name = url.split('/').pop();
    const path = `${folder}/${image_name}`;

    axios({
        url: url,
        method: 'GET',
        responseType: 'stream',
    })
    .then(response => {
        response.data.pipe(fs.createWriteStream(path));
    })
    .catch(error => {
        console.error('Erreur lors du téléchargement de l\'image :', error.message);
    });
}


// test

function test() {
    const url = 'https://image.tmdb.org/t/p/w500/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg';
    const folder = '../public/download';

    downloadImage(url, folder);
}


module.exports = downloadImage;