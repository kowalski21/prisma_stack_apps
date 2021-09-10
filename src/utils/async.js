exports.asyncHandler = (handler) => {
  if (handler.length === 2 || handler.length === 3) {
    const scoped = (req, res, next) =>
      Promise.resolve(handler(req, res, next)).catch(next);

    return scoped;
  } else if (handler.length === 4) {
    const scoped = (err, req, res, next) =>
      Promise.resolve(handler(err, req, res, next)).catch(next);

    return scoped;
  } else {
    throw new Error(`Failed to handle function ${handler.name}`);
  }
};
