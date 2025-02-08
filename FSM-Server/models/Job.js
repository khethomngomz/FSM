const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  client: { type: String, required: true },
  location: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  startTime: { type: Date },
  finishTime: { type: Date },
  comments: [
    {
      stage: { type: String, enum: ["on-the-way", "arrival", "progress", "completion"] },
      comment: { type: String },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  beforeImage: { type: String },
  afterImage: { type: String },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Job", jobSchema);
