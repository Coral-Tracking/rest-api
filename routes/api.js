const express = require("express");
const mainController = require("../controllers/mainController");
const router = express.Router();

router.get("/area", mainController.getArea);
router.get("/areas", mainController.getAreas);
router.post("/area", mainController.createArea);
router.put("/area", mainController.updateArea);
router.delete("/area", mainController.removeArea);

module.exports = router;
