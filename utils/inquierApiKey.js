
// demanderCleAPI.js
const inquirer = require('inquirer');
const fs = require('fs');

// Créer des questions pour demander la clé API et le chemin du dossier Series
const questions = [
  {
    type: 'input',
    name: 'apiKey',
    message: 'Veuillez entrer votre clé API :',
  },
  {
    type: 'input',
    name: 'seriesPath',
    message: 'Veuillez entrer le chemin du dossier "Series" :',
    default: './Series', // Valeur par défaut si l'utilisateur appuie simplement sur Entrée
  },
];

// Poser les questions à l'utilisateur
inquirer.prompt(questions)
    .then((answers) => {
    // Enregistrez les réponses dans le fichier de configuration
    const config = `const config = { 
      apiKey: '${answers.apiKey}', 
      seriesPath: '${answers.seriesPath}' 
    }; 
    module.exports = config;`;

    fs.writeFile('./config.js', config, (err) => {
      if (err) throw err;
      console.log('Les informations ont été enregistrées avec succès dans le fichier de configuration.');
    });
});
