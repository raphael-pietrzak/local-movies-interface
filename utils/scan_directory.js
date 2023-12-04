const fs = require('fs');
const path = require('path');

// Fonction pour parcourir les fichiers et dossiers récursivement
function scanDirectory(directoryPath) {
  const items = fs.readdirSync(directoryPath);

  return items.map(item => {
    const fullPath = path.join(directoryPath, item);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      return {
        type: 'folder',
        name: item,
        children: scanDirectory(fullPath) // Récursion pour les sous-dossiers
      };
    } else {
      return {
        type: 'file',
        name: item
      };
    }
  });
}

// Exemple d'utilisation pour un dossier racine contenant des séries
const rootPath = '/chemin/vers/vos/donnees';
const seriesData = scanDirectory(rootPath);

console.log(JSON.stringify(seriesData, null, 2));
