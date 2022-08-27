const express = require("express");
const mainController = require("../controllers/mainController");
const router = express.Router();

router.get("/area/:areaId", mainController.getArea);
router.get("/areas", mainController.getAreas);
router.post(
  "/area",
  mainController.validates("createArea"),
  mainController.createArea
);
router.put(
  "/area/:areaId",
  mainController.validates("updateArea"),
  mainController.updateArea
);
router.delete("/area/:areaId", mainController.removeArea);

module.exports = router;
