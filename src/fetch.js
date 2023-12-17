const { Octokit } = require("octokit");
const { createAppAuth } = require("@octokit/auth-app");

const authToken = process.env.GITHUB_ACCESS_TOKEN;
const privateKey = process.env.PRIVATE_KEY;
const appId = process.env.APP_ID;

let repositoryOwner = "vishesh-baghel";
let repositoryName = "email-app";
let pullNumber = 17;

const octokit = new Octokit({
  auth: authToken,
  userAgent: "code-review-bot v1.0",
  previews: ["jean-grey", "symmetra"],
  log: {
    debug: () => {},
    info: () => {},
    warn: console.warn,
    error: console.error,
  },
});

const appOctokit = new Octokit({
  authStrategy: createAppAuth,
  auth: {
    appId: appId,
    privateKey: privateKey,
    // installationId: 45108724,
  },
});

async function fetchDetails(app, resource) {
  try {
    app.log.info("fetching details for resource: " + resource);
    const { data } = await appOctokit.request(resource);

    // const { data1 } = await appOctokit.request("/");

    return data;
  } catch (err) {
    app.log.error({
      message: `Error while fetching resource details for resource url: ${resource}`,
    });
    app.log.error(err);
  }
}

async function fetchPRDetails(app) {
  app.log.info("fetching PR details");
  const { data: pullRequest } = await octokit.rest.pulls.get({
    owner: repositoryOwner,
    repo: repositoryName,
    pull_number: pullNumber,
  });

  return pullRequest;
}

module.exports = { fetchPRDetails, fetchDetails };
