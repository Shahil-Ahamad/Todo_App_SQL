import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  task: { type: String, required: true, unique: true }, // Name is required
  description: { type: String, required: true }, // Email must be unique
  status: {
    type: String,
    enum: ["todo", "in_progress", "completed"],
    default: "todo",
  },
  created_at: { type: Date, default: Date.now },
});


export const TodoModel = mongoose.model("Todo",todoSchema);


