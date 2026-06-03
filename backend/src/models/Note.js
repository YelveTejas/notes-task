const mongoose = require("mongoose");
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    maxLength: [200, "Title cannot exceed 100 characters"],
  },

  content: {
    type: String,
    required: [true, "Content is required"],
    trim: true,
  },
},{
    timestamps: true,
});



noteSchema.index({ title: "text", content: "text" });

module.exports = mongoose.model("Note", noteSchema);