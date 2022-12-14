const areaModel = require("../models/areaModel");
const coralModel = require("../models/coralModel");
const { check } = require("express-validator");
const { find } = require("../models/coralModel");
const { uploadImage, removeImage } = require("../utils/uploadImage");

module.exports = {
  createArea: async (req, res, next) => {
    try {
      const { areaName, location, markColor } = req.body;
      await areaModel.create({
        areaName,
        location,
        markColor,
      });
      return res.status(201).json({ msg: "success" });
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  },
  getArea: async (req, res, next) => {
    try {
      const { areaId } = req.params;
      const area = await areaModel.findById(areaId);
      return res.status(200).json({ data: area });
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  },
  getAreas: async (req, res, next) => {
    try {
      const areas = await areaModel.find();
      return res.status(200).json({ data: areas });
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  },
  updateArea: async (req, res, next) => {
    try {
      const { areaId } = req.params;
      const { areaName, location, markColor } = req.body;
      await areaModel.findByIdAndUpdate(areaId, {
        areaName,
        location,
        markColor,
      });
      return res.status(200).json({ msg: "success" });
    } catch (error) {
      return res.status(400).json({ mesg: error.message });
    }
  },
  removeArea: async (req, res, next) => {
    try {
      const { areaId } = req.params;
      await areaModel.findByIdAndRemove(areaId);
      return res.status(200).json({ msg: "success" });
    } catch (error) {
      return res.status(400).json({ mesg: error.message });
    }
  },
  createCoral: async (req, res, next) => {
    try {
      const { species, percentage, latitude, longitude, areaId, imageUrl } =
        req.body;
      await coralModel.create({
        species,
        percentage,
        latitude,
        longitude,
        areaId,
        imageUrl,
      });
      return res.status(201).json({ msg: "success" });
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  },
  getCoral: async (req, res, next) => {
    try {
      const { coralId } = req.params;
      const coral = await coralModel.findById(coralId);
      return res.status(200).json({ data: coral });
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  },
  getCorals: async (req, res, next) => {
    try {
      const { areaId } = req.query;
      const corals = areaId
        ? await coralModel
            .find({ areaId: areaId })
            .populate({ path: "areaId", select: { _id: 0 } })
        : await coralModel
            .find({})
            .populate({ path: "areaId", select: { _id: 0 } });
      return res.status(200).json({ data: corals });
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  },
  removeCoral: async (req, res, next) => {
    try {
      const { coralId } = req.params;
      await coralModel.findByIdAndRemove(coralId);
      return res.status(200).json({ msg: "success" });
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  },
  uploadImage: async (req, res, next) => {
    try {
      const image = req.file;
      const imageUrl = await uploadImage(image);

      res.status(200).json({
        msg: "success",
        imageUrl,
      });
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  },
  removeImage: async (req, res, next) => {
    try {
      const { imageUrl } = req.body;

      if (!imageUrl)
        return res.status(422).send("Should have image url for delete image");

      const image = await removeImage(imageUrl);

      if (!image) return res.status(404).json({ message: "failed" });

      return res.status(200).json({ message: "success" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  validates: (method) => {
    switch (method) {
      case "createArea": {
        return [
          check("areaName")
            .exists()
            .notEmpty()
            .trim()
            .withMessage("areaName is required")
            .custom((value, { req }) => {
              return areaModel.find({ areaName: value }).then((area) => {
                if (area) return Promise.reject("areaName is already in used");
              });
            }),
          check("location").exists().withMessage("location is required"),
          check("markColor")
            .exists()
            .withMessage("markColor is required")
            .custom((value, { req }) => {
              return area.find({ markColor: value }).then((area) => {
                if (area) return Promise.reject("markColor is already in used");
              });
            }),
        ];
      }
      case "updateArea": {
        return [
          check("areaName")
            .exists()
            .notEmpty()
            .trim()
            .withMessage("areaName is required")
            .custom((value, { req }) => {
              return areaModel.find({ areaName: value }).then((area) => {
                if (area) return Promise.reject("areaName is already in used");
              });
            }),
          check("location").exists().withMessage("location is required"),
          check("markColor")
            .exists()
            .withMessage("markColor is required")
            .custom((value, { req }) => {
              return area.find({ markColor: value }).then((area) => {
                if (area) return Promise.reject("markColor is already in used");
              });
            }),
        ];
      }
      case "createCoral": {
        return [
          check("species")
            .exists()
            .notEmpty()
            .trim()
            .withMessage("species is required"),
          check("percentage")
            .exists()
            .notEmpty()
            .trim()
            .withMessage("percentage is required"),
          check("latitude")
            .exists()
            .notEmpty()
            .trim()
            .withMessage("latitude is required"),
          check("longitude")
            .exists()
            .notEmpty()
            .trim()
            .withMessage("longitude is required"),
          check("areaId")
            .exists()
            .notEmpty()
            .trim()
            .withMessage("areaId is required"),
        ];
      }
    }
  },
};
