const http = require("../../services/axios");
const Launch = require("../spacex/model/model");

function parseJSONField(field) {
    try {
        return JSON.parse(field);
    } catch (error) {
        return field;
    }
}

function parseDate(dateString) {
    const date = new Date(dateString);
    return isNaN(date) ? null : date;
}

async function importLaunches() {
    try {
        const response = await http.get("/launches");
        const launches = response.data;
        console.log(launches.length);

        for (const launchData of launches) {

            const existingLaunch = await Launch.findByPk(launchData.id);

            if (existingLaunch) {
                console.log(`Lançamento "${launchData.name}" já existe. Dados atualizados.`);
            } else {
                for (const key in launchData) {
                    if (launchData[key] === null) {
                        launchData[key] = '';
                    }
                }
                launchData.window = launchData.window || null;
                launchData.success = launchData.success ? 1 : 0;
                launchData.static_fire_date_unix = launchData.static_fire_date_unix || null;
                launchData.static_fire_date_utc = parseDate(launchData.static_fire_date_utc);
                launchData.fairings = parseJSONField(launchData.fairings);
                launchData.links = parseJSONField(launchData.links);
                launchData.failures = parseJSONField(launchData.failures);
                launchData.crew = parseJSONField(launchData.crew);
                launchData.ships = parseJSONField(launchData.ships);
                launchData.capsules = parseJSONField(launchData.capsules);
                launchData.payloads = parseJSONField(launchData.payloads);
                launchData.cores = parseJSONField(launchData.cores);

                await Launch.create(launchData);
                console.log(`Lançamento "${launchData.name}" importado.`);
            }
        }

        console.log('Importação concluída.');
    } catch (error) {
        console.error('Erro na importação:', error);
    }
}

module.exports = importLaunches;
