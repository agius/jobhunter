// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var cookieParser   = require('cookie-parser');
var methodOverride = require('method-override');
var passport       = require('passport');
var session        = require('express-session');
var morgan         = require('morgan');

// configuration ===========================================
  
// config files
var db = require('./config/db');

var port = process.env.PORT || 8080; // set our port
mongoose.connect(db.url); // connect to our mongoDB database

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// cookies & sessions
app.use(cookieParser('wpCNJ8oUfdQmVySvzsW'));
app.use(session({
  secret: 'wpCNJ8oUfdQmVySvzsW',
  saveUninitialized: true,
  resave: true,
  cookie : {
    expires: false
  }
}));

app.use(morgan('dev'));

// models ==================================================
require('./app/models/job');
require('./app/models/user');

// bootstrap passport config
require('./config/passport')(passport, {});
app.use(passport.initialize());
app.use(passport.session());

// routes ==================================================
require('./app/routes/userRoutes')(app, passport);
require('./app/routes/jobRoutes')(app);
require('./app/routes/frontend')(app);

// start app ===============================================
app.listen(port);                   // startup our app at http://localhost:8080
console.log('Magic happens on port ' + port);       // shoutout to the user
exports = module.exports = app;             // expose app