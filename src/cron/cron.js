const cron = require('node-cron');
const importLaunches = require('../modules/scripts/scripts');
const importRockets = require('../modules/scripts/scriptsRockets');

cron.schedule('* * * * *', async () => {
    console.log('Iniciando importação de lançamentos...');
    try {
        await importLaunches(); 
        await importRockets()
        console.log("importação feita")
    } catch (error) {
        console.error('Erro na importação:', error);
    }
});
