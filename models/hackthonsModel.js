const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {

    Description: {
      type: String,
    },
    
    date: {
      type: Date,
      required: [true, "data is required"],
    },
  },
  { timestamps: true }
);

const hackthonModel = mongoose.model("event", eventSchema);
module.exports = hackthonModel;
