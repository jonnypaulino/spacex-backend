const express = require('express');
const cors = require("cors");

const importLaunches = require('./modules/scripts/scripts');
const  sequelize  = require('./db/config');
const router = express.Router();

const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('../swagger'); 
const app = express();

app.use(cors());

require("./cron/cron")

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

const spacexroutes = require('./modules/spacex/routes');

const rocketsroutes = require('./modules/rockets/routes');

const importRockets = require('./modules/scripts/scriptsRockets');

app.use(express.json());

app.use(router.get('/', (req, res) => {
  res.send('Fullstack Challenge 🏅 - Space X API');
}))


sequelize
  .sync()
  .then(() => {
    importLaunches()
    importRockets()
    console.log("Database successfully connected");
  })
  .catch((err) => {
    console.log("Error", err);
  });


app.use(spacexroutes)
app.use(rocketsroutes)

app.listen(3002, () => {
    console.log(`Servidor rodando na porta ${3002}`);
  });


module.exports = router;