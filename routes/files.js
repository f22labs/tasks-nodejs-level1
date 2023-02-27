const express = require("express");
const router = express.Router();

/* GET /files/:fileName */
router.get("/:fileName", function (req, res, next) {
  res.send({
    filename: "some-file",
    length: 0,
    content: "",
  });
});

module.exports = router;
