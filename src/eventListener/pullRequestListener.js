const commentBot = require("../commentGenerator");

function listeningForPREvents(app) {
  return new Promise((resolve, reject) => {
    try {
      app.log.info("Listening for PR events!");

      app.on(
        ["pull_request.opened", "pull_request.synchronize"],
        async (context) => {
          app.log.info("Received a PR open event");

          const comment = "Thanks for opening this PR";
          const { installation, pull_request } = context.payload;

          const data = {
            installationId: installation.id,
            installationNodeId: installation.node_id,
            issueUrl: pull_request._links.issue.href,
            issueCommentsUrl: pull_request._links.comments.href,
            reviewCommentsUrl: pull_request._links.review_comments.href,
            commitsUrl: pull_request._links.commits.href,
            pullRequestUrl: pull_request.url,
          };

          commentBot(app, context, comment);
          app.log.info(`Sending data to the risk-scoring-module as: ${data}`);
          resolve(data);
        }
      );
    } catch (err) {
      app.log.error({ message: "Error occurred while listening to PR events" });
      app.log.error(err);
      reject(err);
    }
  });
}

module.exports = listeningForPREvents;
