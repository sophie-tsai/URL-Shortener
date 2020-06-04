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
    timesUsed: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('url', urlSchema);
