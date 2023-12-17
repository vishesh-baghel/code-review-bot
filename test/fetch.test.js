const nock = require("nock");
const myProbotApp = require("..").default;
const { Probot, ProbotOctokit } = require("probot");
const payload = require("./fixtures/fetched.details");
const fs = require("fs");
const path = require("path");

const privateKey = fs.readFileSync(
  path.join(__dirname, "fixtures/mock-cert.pem"),
  "utf-8"
);

describe("My Probot app", () => {
  let appOctokit;

  beforeEach(() => {
    nock.disableNetConnect();
  });
});
