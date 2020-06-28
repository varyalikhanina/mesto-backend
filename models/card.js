const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const validator = function validator(value) {
  return /(http:\/\/|https:\/\/)((([w]{3})?\.?((\w*\.)*)?[a-z]{2,6}((\/\w*)*)?)|((1?[0-9]?[0-9]\.|2?[0-5]?[0-5]\.){3}(1?[0-9]?[0-9]|2?[0-5]?[0-5])))(:(6[1-4][0-9]{3}|65[1-4][0-9]{2}|655[1-2][0-9]|6553[1-5]|[1-5]?[0-9]{2,4}))?/.test(value);
};

cardSchema.path('link').validate(validator, 'Здесь должна быть ссылка');

module.exports = mongoose.model('card', cardSchema);
