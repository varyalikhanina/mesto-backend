const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
});

const validator = function validator(value) {
  return /(http:\/\/|https:\/\/)((([w]{3})?\.?((\w*\.)*)?[a-z]{2,6}((\/\w*)*)?)|((1?[0-9]?[0-9]\.|2?[0-5]?[0-5]\.){3}(1?[0-9]?[0-9]|2?[0-5]?[0-5])))(:(6[1-4][0-9]{3}|65[1-4][0-9]{2}|655[1-2][0-9]|6553[1-5]|[1-5]?[0-9]{2,4}))?/.test(value);
};

userSchema.path('avatar').validate(validator, 'Здесь должна быть ссылка');

module.exports = mongoose.model('user', userSchema);
