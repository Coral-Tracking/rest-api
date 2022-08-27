const areaModel = require("../models/areaModel");
const { check } = require("express-validator");

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
    }
  },
};
