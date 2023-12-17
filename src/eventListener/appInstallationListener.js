function listeningForAppInstallationEvents(app) {
  return new Promise((resolve, reject) => {
    try {
      app.log.info("Listening for app installation events");

      app.on("installation.created", async (context) => {
        app.log.info("Received an app installation event");

        resolve(context.payload);
      });
    } catch (error) {
      app.log.error(
        "Error occurred while listening for app installation events"
      );
      reject(error);
    }
  });
}

module.exports = listeningForAppInstallationEvents;
