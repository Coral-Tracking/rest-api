const mongoose = require("mongoose");
const { Schema } = mongoose;

const coralSchema = new Schema({
  species: {
    type: String,
    require: true,
  },
  percentage: {
    type: Number,
    require: true,
  },
  latitude: {
    type: Number,
    require: true,
  },
  longitude: {
    type: Number,
    require: true,
  },
  imageUrl: {
    type: String,
    require: true,
  },
  areaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Areas",
    require: true,
  },
  createdAt: {
    type: String,
    default: Date.now(),
  },
});

const coralModel = mongoose.model("Corals", coralSchema);
module.exports = coralModel;
