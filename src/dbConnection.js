const mySql = require("mysql2");

function connectDB(app) {
  return new Promise((resolve, reject) => {
    try {
      const connection = mySql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
      });

      connection.connect();
      app.log.info("Connected to the Database successfully");
      resolve(connection);
    } catch (error) {
      app.log.info("Error occurred while connecting to the database");
      reject(error);
    }
  });
}

module.exports = { connectDB };
