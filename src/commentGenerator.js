function commentBot(app, context, comment) {
  const commentToAdd = context.issue({
    body: comment,
  });

  app.log.info(`Added comment on the PR as: ${commentToAdd.body}`);

  return context.octokit.issues.createComment(commentToAdd);
}

module.exports = commentBot;
