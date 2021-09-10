const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const { errorHandler, notFoundHandler } = require("./middleware/error");

const { testRouter } = require("./routers/test");

const app = express();

// middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.use("/api/test", testRouter);

app.use(notFoundHandler);
app.use(errorHandler);
module.exports = { app };
