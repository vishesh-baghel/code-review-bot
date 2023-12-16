const { fetchPRDetails, fetchDetails } = require("./fetch");

function main(app) {
  fetchPRDetails(app).then((pullRequest) => {
    // app.log.info(pullRequest);
  });

  commentBot(app);

  fetchDetails(app, "/app").then((data) => {
    app.log.info("Github app details");
    app.log.info(data);
  });

  fetchDetails(app, "/app/installations").then((data) => {
    app.log.info("Installation details");
    app.log.info(data);
  });

  fetchDetails(app, "/installation/repositories").then((data) => {
    app.log.info("Repository details");
    app.log.info(data);
  });
}

function commentBot(app) {
  app.log.info("Listening to the github events!");

  app.on("issues.opened", async (context) => {
    const issueComment = context.issue({
      body: "Thanks for opening this issue!",
    });
    return context.octokit.issues.createComment(issueComment);
  });
}

module.exports = { commentBot, main };
