const functions = require("firebase-functions");
const server = require("./src/server");

const api = functions
  .runWith({ memory: "1GB", timeoutSeconds: 120 })
  .https
  .onRequest(server);

module.exports = { api };
