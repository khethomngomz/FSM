const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  image: { type: String },
  checkedOutBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  checkoutTime: { type: Date },
  returnTime: { type: Date },
});

module.exports = mongoose.model("Inventory", inventorySchema);
