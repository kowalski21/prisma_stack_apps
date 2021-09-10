const { asyncHandler } = require("../utils/async");

const router = require("express").Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    return res.json({ message: "its working" });
  })
);

module.exports = {
  testRouter: router,
};
