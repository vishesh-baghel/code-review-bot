/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
const { main } = require("./src/main");

module.exports = (app) => {
  app.log.info("Yay, code-review bot was loaded!");

  // const { state } = app;
  // app.log.info(state);

  main(app);
};
