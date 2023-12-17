const {
  createLambdaFunction,
  createProbot,
} = require("@probot/adapter-aws-lambda-serverless");

const appFn = require("./");
module.exports.lambdaFn = createLambdaFunction(appFn, {
  probot: createProbot(),
});
