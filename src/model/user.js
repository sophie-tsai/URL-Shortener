const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true,
  },
});

export const User = mongoose.model('user', userSchema);
