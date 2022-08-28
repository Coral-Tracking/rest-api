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

router.get("/coral/:coralId", mainController.getCoral);
router.get("/corals", mainController.getCorals);
router.post(
  "/coral",
  mainController.validates("createCoral"),
  mainController.createCoral
);
router.delete("/coral/:coralId", mainController.removeCoral);

router.post("/file", mainController.uploadImage);
router.delete("/file", mainController.removeImage);

module.exports = router;
