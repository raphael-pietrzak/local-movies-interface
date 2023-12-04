const fs = require('fs');

function get_folder_names(directoryPath) {
  try {
    // Lire le contenu du répertoire
    const filesAndFolders = fs.readdirSync(directoryPath);

    // Filtrer les dossiers
    const folderNames = filesAndFolders.filter(item => fs.statSync(`${directoryPath}/${item}`).isDirectory());

    return folderNames;
  } catch (error) {
    console.error('Erreur lors de la récupération des noms de dossiers :', error.message);
    return [];
  }
}

// test
function test() {
  const directoryPath = '/Users/monkeyparadise/Movies';
  const folderNames = get_folder_names(directoryPath);

  console.log('Noms de dossiers :', folderNames);
}

// test();

module.exports = get_folder_names;
