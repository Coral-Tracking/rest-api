const mongoose = require("mongoose");
const { Schema } = mongoose;

const areaSchema = new Schema({
  areaName: {
    type: String,
    require: true,
    unique: true,
  },
  location: {
    type: String,
    require: true,
  },
  markColor: {
    type: String,
    require: true,
    unique: true,
  },
});

const areaModel = mongoose.model("Areas", areaSchema);
module.exports = areaModel;
