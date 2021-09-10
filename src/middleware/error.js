const _ = require("lodash");
const { BaseError, sendError } = require("../utils/error");
const { config } = require("../config");

const toArray = (val) => {
  return Array.isArray(val) ? val : [val];
};
exports.errorHandler = (err, req, res, next) => {
  let payload = {
    errors: [],
  };

  const errors = toArray(err);

  if (errors.some((err) => err instanceof BaseError === false)) {
    res.status(500);
  } else {
    let status = errors[0].status;

    for (const err of errors) {
      if (status !== err.status) {
        // If there's multiple different status codes in the errors, use 500
        status = 500;
        break;
      }
    }

    res.status(status);
  }

  for (const err of errors) {
    if (config.node_env === "development") {
      err.extensions = {
        ...(err.extensions || {}),
        stack: err.stack,
      };
    }

    if (err instanceof BaseError) {
      res.status = err.status;
      payload.errors.push({
        message: err.message,
        extensions: { ...err.extensions },
      });
    } else {
      res.status(500);

      payload = {
        errors: [
          {
            message: err.message,
            extensions: {
              ...err.extensions,
            },
          },
        ],
      };
    }
  }

  return res.json(payload);
};

exports.notFoundHandler = (req, res, next) => {
  sendError(`Route not Found`, 404);
};
