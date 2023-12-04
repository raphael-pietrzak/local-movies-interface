
const fs = require('fs')



function get_path_from_id(id) {
    const path = '/Users/monkeyparadise/Movies/'
    const saison = "";
    const title = "Hunter x Hunter";
    const videoPath = path + saison;

    const rawdata = fs.readFileSync('data/movie_info.json');
    const jsonData = JSON.parse(rawdata);

    const movie = jsonData[id];

    // console.log(movie);
    if (!movie) {
        return null;
    }

    const movieName = movie.name;
    const pathName = movie.file_name;
    // console.log(movieName, pathName);
    const files = fs.readdirSync(path + pathName);

    for (const file of files) {
        if (file.includes('mp4') || file.includes('mkv') || file.includes('avi')) {
            // console.log(file);
            return path + pathName + "/" + file
        }
    }
    return null;
}

module.exports = get_path_from_id;