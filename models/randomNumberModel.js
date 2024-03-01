const mongoose = require("mongoose");

const randomNumberSchema = new mongoose.Schema(
  {
    number: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const RandomNumber = mongoose.model("RandomNumber", randomNumberSchema);
module.exports = RandomNumber;
