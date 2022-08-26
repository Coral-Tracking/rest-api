const areaModel = require("../models/areaModel");

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
};
