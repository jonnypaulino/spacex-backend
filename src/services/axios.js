const axios = require('axios');

const http = axios.create({
    baseURL: "https://api.spacexdata.com/v4/",
  });

module.exports = http ;

