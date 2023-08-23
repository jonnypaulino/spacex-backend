const express = require('express');
const importLaunches = require('./modules/scripts/scripts');
const  sequelize  = require('./db/config');
const router = express.Router();
const app = express();


const spacexroutes = require('./modules/spacex/routes');

app.use(express.json());

app.use(router.get('/', (req, res) => {
  res.send('Fullstack Challenge 🏅 - Space X API');
}))

sequelize
  .sync()
  .then(() => {
    importLaunches()
    console.log("Database successfully connected");
  })
  .catch((err) => {
    console.log("Error", err);
  });


app.use(spacexroutes)

app.listen(3002, () => {
    console.log(`Servidor rodando na porta ${3002}`);
  });


module.exports = router;