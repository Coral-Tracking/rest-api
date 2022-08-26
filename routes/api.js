const express = require("express");
const mainController = require("../controllers/mainController");
const router = express.Router();

router.post("/area", mainController.createArea);

module.exports = router;
