const swaggerJsdoc = require('swagger-jsdoc');
const rocketsRead = require("./src/docs/rockets/readRockets.json")
const LaunchesRead = require("./src/docs/launches/readLaunches.json")

const LaunchesStatsRead = require("./src/docs/launches/readLaunchesStats.json")
const LaunchesRockets = require("./src/docs/launches/readLaunchesRockets.json")
const LaunchesRocketsYear = require("./src/docs/launches/readLaunchesRocketsYear.json")

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'SpaceX API',
            version: '1.0.0',
            description: 'API para acessar informações sobre lançamentos da SpaceX',
        },

        paths: {
            '/rockets': rocketsRead,

            '/launches': LaunchesRead,
            '/launches/stats': LaunchesStatsRead,
            '/launches/rockets':LaunchesRockets,
            '/launches/rockets/year':LaunchesRocketsYear
        },

    },
    apis: ['./path/to/your/routes/*.js'], // Caminho para os arquivos de rotas da sua API
};

const specs = swaggerJsdoc(options);

module.exports = specs;
