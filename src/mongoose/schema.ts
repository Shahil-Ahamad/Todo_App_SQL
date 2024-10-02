import mongoose from "mongoose";

const todosSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Name is required
  discription: { type: String, required: true }, // Email must be unique
  status: {
    type: String,
    enum: ["todo", "in_progress", "completed"],
    default: "todo",
  },
  created_at: { type: Date, default: Date.now },
});
