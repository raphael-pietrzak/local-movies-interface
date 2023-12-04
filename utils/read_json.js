
const fs = require('fs').promises;



async function readJsonFile(filePath) {
    try {
      const jsonData = await fs.readFile(filePath, 'utf8');
      return JSON.parse(jsonData);
    } catch (error) {
      throw new Error(`Erreur lors de la lecture du fichier JSON : ${error.message}`);
    }
  }

module.exports = readJsonFile;