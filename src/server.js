const config = require("./config");

const { app } = require("./app");

app.listen(config.port, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server is running on port ${config.port}`);
});
