const fs = require('fs');
const path = require('path');
const readJsonFile = require('./read_json');


function saveToJsonFile(filePath, jsonData) {
    const jsonContent = JSON.stringify(jsonData, null, 2);

    fs.writeFile(filePath, jsonContent, 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('File has been saved');
    });
}

async function update_progress(id, progress) {

    const file_path = path.join(__dirname, '../data/current_episode.json');

    const data = await readJsonFile(file_path);

    if (!data[id]) {
        data[id] = progress;
        saveToJsonFile(file_path, data);
        return;
    }

    const new_progression = parseInt(progress.progression, 10);
    const current_progression = parseInt(data[id].progression, 10);

    if (new_progression !== current_progression) {
        // console.log(new_progression, current_progression);
        data[id] = progress;
        saveToJsonFile(file_path, data);
    }
}



module.exports = {
    saveToJsonFile,
    update_progress
};