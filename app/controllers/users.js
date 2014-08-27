var mongoose = require('mongoose')
  , User = mongoose.model('User');

exports.logout = function (req, res) {
  req.logout()
  res.redirect('/login')
}

exports.create = function (req, res) {
  var user = new User();
  user.email = req.body.email;
  user.password = req.body.password;
  user.save(function (err) {
    if (err) res.send(err);

    // manually login the user once successfully signed up
    req.logIn(user, function(err) {
      if (err) return next(err)
      return res.json(user);
    })
  })
}