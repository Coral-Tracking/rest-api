module.exports = {
  createArea: async (req, res, next) => {
    try {
      return res.status(201).json({ msg: "Hello World!" });
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  },
  getArea: async (req, res, next) => {},
  getAreas: async (req, res, next) => {},
  updateArea: async (req, res, next) => {},
  removeArea: async (req, res, next) => {},
};
