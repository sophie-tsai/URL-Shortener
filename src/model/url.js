const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema(
  {
    longUrl: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      unique: true,
    },
    timesUsed: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
  },
  { timestamps: true }
);

export const Url = mongoose.model('url', urlSchema);
