var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var crypto       = require('crypto');

var UserSchema   = new Schema({
  email: String,
  hashed_password: String,
  salt: String
});

UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function() { return this._password })

UserSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },

  makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  },

  encryptPassword: function (password) {
    if (!password) return ''
    var _encrypted;
    try {
      _encrypted = crypto.createHmac('sha1', this.salt).update(password).digest('hex')
      return _encrypted;
    } catch (err) {
      return ''
    }
  }
}

mongoose.model('User', UserSchema);