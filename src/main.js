const { fetchPRDetails, fetchDetails } = require("./fetch");
const listeningForPREvents = require("./eventListener/pullRequestListener");
const configs = require("./configs/main.configs.json");
const { connectDB } = require("./dbConnection");
const listeningForAppInstallationEvents = require("./eventListener/appInstallationListener");

function main(app) {
  let db;

  connectDB(app).then((connection) => {
    db = connection;
  });

  fetchPRDetails(app).then((pullRequest) => {
    // app.log.info(pullRequest);
  });

  listeningForPREvents(app);

  listeningForAppInstallationEvents(app).then((data) => {
    app.log.info(data);
  });

  fetchDetails(app, "/app").then((data) => {
    app.log.info("details");
    // app.log.info(data);
  });

  fetchDetails(app, configs.endpoints.app_details).then((data) => {
    app.log.info("Github app details");
    // app.log.info(data);
  });

  fetchDetails(app, configs.endpoints.all_installations_list).then((data) => {
    app.log.info("Installation details");
    // app.log.info(data);
  });

  // fetchDetails(app, "/installation/repositories").then((data) => {
  //   app.log.info("Repository details");
  //   app.log.info(data);
  // });
}

module.exports = { main };
