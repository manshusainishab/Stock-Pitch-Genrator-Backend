import { Pitch } from "../models/pitchSchema.js";
export const sendPitch = async (req, res, next) => {
  try {
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({
        success: false,
        message: "Description is required.",
      });
    }
    const pitch = await Pitch.create({ 
      description, 
      owner: req.user._id
    });

    return res.status(201).json({
      success: true,
      message: "Pitch added successfully",
      pitch,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getAllPitches = async (req, res, next) => {
  try {
    const pitches = await Pitch.find({ owner: req.user._id });
    return res.status(200).json({ pitches });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

