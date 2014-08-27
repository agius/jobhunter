// in a larger app, I would separate these out into real controllers
// in a toy app... I will be lazy

var mongoose = require('mongoose')
  , User = mongoose.model('User');

module.exports = function(app, passport) {

  app.get('/api/session', function(req, res){
    res.json(req.user);
  });

  app.post('/api/session', passport.authenticate('local'), function(req, res){
    res.json(req.user);
  });

  app.delete('/api/session', function(req, res){
    req.logout()
    res.json({message: 'logged out'});
  });
  
  app.post('/api/users', function(req, res){
    var user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    user.save(function (err) {
      if (err) res.send(err);

      // manually login the user once successfully signed up
      req.logIn(user, function(err) {
        if (err) res.send(err);
        return res.json(user);
      });
    });
  });

};