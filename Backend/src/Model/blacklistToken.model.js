import mongoose from "mongoose";

const blacklisttokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: '1d' }, // TTL index for automatic deletion after 86400 seconds (1 day)
    },
});

export const BlacklistToken = mongoose.model("BlacklistToken", blacklisttokenSchema);
