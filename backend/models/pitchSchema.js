import mongoose from "mongoose";

const pitchSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "Pitch description is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Pitch = mongoose.model("Pitch", pitchSchema);
