const fs = require('fs');
const cors = require('cors');
const express =  require("express");
const app = express();

/* App settings */
app.use(cors());

/* Stored data json for form */
const storedData = require('./lib/test-data/form-data.json');

/* Utils */
const utils = require("./utils.js");
const { processRecivedData, resetStoredData } = utils;

/* Request processing */
app.get('/get-initial-form-data', (request, response) => {
  resetStoredData();
  setTimeout(() => {
   response.json(storedData);
 }, 1500)
});

app.put('/get-processed-form-data', (request, response) => {
  const responseData = request.body;
  setTimeout(() => {
      response.json(processRecivedData(responseData))
  }, 1500)
});

app.get('/reset-form-data', (request, response) => {
  resetStoredData();
  response.json(storedData)
});

module.exports = app;
