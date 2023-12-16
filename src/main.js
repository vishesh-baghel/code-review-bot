const { fetchPRDetails, fetchDetails } = require("./fetch");

function main(app) {
  fetchPRDetails(app).then((pullRequest) => {
    // app.log.info(pullRequest);
  });

  listeningForPREvents(app);

  fetchDetails(app, "/app").then((data) => {
    app.log.info("Github app details");
    // app.log.info(data);
  });

  fetchDetails(app, "/app/installations").then((data) => {
    app.log.info("Installation details");
    // app.log.info(data);
  });

  fetchDetails(app, "/installation/repositories").then((data) => {
    app.log.info("Repository details");
    // app.log.info(data);
  });
}

function commentBot(app, context, comment) {
  const commentToAdd = context.issue({
    body: comment,
  });

  app.log.info(`Added comment on the PR as: ${commentToAdd.body}`);

  return context.octokit.issues.createComment(commentToAdd);
}

function listeningForPREvents(app) {
  try {
    app.log.info("Listening for PR events!");
    let data = {};

    app.on(
      ["pull_request.opened", "pull_request.synchronize"],
      async (context) => {
        app.log.info("Received a PR open event");
        // app.log.info(context);
        const comment = "Thanks for opening this PR";

        data = {
          installationId: context.payload.installation.id,
          installationNodeId: context.payload.installation.node_id,
          issueUrl: context.payload.pull_request._links.issue.href,
          issueCommentsUrl: context.payload.pull_request._links.comments.href,
          reviewCommentsUrl:
            context.payload.pull_request._links.review_comments.href,
          commitsUrl: context.payload.pull_request._links.commits.href,
          pullRequestUrl: context.payload.pull_request.url,
        };
        commentBot(app, context, comment);
        app.log.info(`Sending data to the risk-scoring-module as: ${data}`);
        return data;
      }
    );
  } catch (err) {
    app.log.error({ message: "Error occurred while listening to PR events" });
    app.log.error(err);
  }
}

module.exports = { commentBot, main };
