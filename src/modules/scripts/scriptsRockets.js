const http = require("../../services/axios");
const Rocket = require("../rockets/model/model");

async function importRockets() {
    try {
        const response = await http.get('/rockets'); 
        const rockets = response.data;

        for (const rocketData of rockets) {
            const existingRocket = await Rocket.findByPk(rocketData.id);

            if (existingRocket) {
                console.log(`Foguete "${rocketData.name}" já existe. Dados atualizados.`);
            } else {
                for (const key in rocketData) {
                    if (rocketData[key] === null) {
                        rocketData[key] = '';
                    }
                }

                await Rocket.create(rocketData);
                console.log(`Foguete "${rocketData.name}" importado.`);
            }
        }

        console.log('Importação de foguetes concluída.');
    } catch (error) {
        console.error('Erro na importação de foguetes:', error);
    }
}

module.exports = importRockets;
