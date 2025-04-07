import config from "/src/config/config";
import sequelize from "/src/config/sequelize";
import app from "./express.js";

try {
  await sequelize.authenticate();
  await sequelize.sync({ force: false }); // Set to true to drop and recreate tables
  console.log('Database connection has been established successfully.');
}
catch (err) {
  throw Error("Unable to connect to the database:", err.message);
}

app.listen(config.port, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server is running on port ${config.port}`);
  }
});
