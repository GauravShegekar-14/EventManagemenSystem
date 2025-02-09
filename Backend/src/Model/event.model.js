const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: false, // Optional for online events
    },
    category: {
      type: String,
      enum: ["Conference", "Webinar", "Meetup", "Workshop", "Party"],
      required: true,
    },
    image: {
      type: String, // Cloudinary URL
      required: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References the User model
      required: true,
    },
    attendees: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    visibility: {
      type: String,
      enum: ["Public", "Private"],
      default: "Public",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

 export const Event = mongoose.model("Event", eventSchema);


