// in a larger app, I would separate these out into real controllers
// in a toy app... I will be lazy

var mongoose     = require('mongoose'),
    _            = require('underscore'),
    Job          = mongoose.model('Job');

module.exports = function(app) {

  var isAuthed = function(req, res, next){
    if(!req.user || !req.user._id){
      res.status(400).send("Sorry, not authorized");
    } else {
      return next();
    }
  }

  app.get('/api/jobs', isAuthed, function(req, res) {
    // use mongoose to get all jobs in the database
    Job.find({_userId: req.user._id}).sort('+createdAt').exec(function(err, jobs) {
      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err) res.send(err);
      res.json(jobs); // return all nerds in JSON format
    });
  });

  app.get('/api/jobs/:state', isAuthed, function(req, res) {
    // use mongoose to get all jobs in the database
    Job.find({_userId: req.user._id, state: req.params('state')})
       .sort('+createdAt')
       .exec(function(err, jobs) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) res.send(err);
        res.json(jobs); // return all nerds in JSON format
    });
  });

  app.get('/api/job/:job_id', isAuthed, function(req, res) {
    Job.findById(req.param('job_id'), function(err, job) {
      if (err) res.send(err);
      if(!job.isPermitted(req.user._id)) res.status(401).send('Unauthorized');
      res.json(job); // return all nerds in JSON format
    });
  });

  app.post('/api/jobs', isAuthed, function(req, res){
    var now = new Date().getTime();
    var job = new Job();
    job.userId = req.user._id;
    job.name = req.body.name;
    job.createdAt = now;
    job.updatedAt = now;

    job.save(function(err, job){
      if (err) req.send(err);
      console.log(job);
    });

    res.json(job);
  });

  app.put('/api/job/:job_id', isAuthed, function(req, res){
    Job.findById(req.param('job_id'), function(err, job){
      if(err) return res.send(err);
      if(!job.isPermitted(req.user._id)) return res.status(401).send('Unauthorized');

      var fields = [
        'name', 'state', 'title', 'location', 'link',
        'contact', 'salary', 'notes', 'interviewAt',
        'interviewLocation', 'awesomeness'
      ]

      _.each(fields, function(field){
        job[field] = req.body[field];
      })

      job.updatedAt = new Date().getTime();
      job.save(function(err){
        if(err) req.send(err);
        res.json(job);
      });
    });
  });

  app.delete('/api/job/:job_id', isAuthed, function(req, res){
    Job.findById(req.param('job_id'), function(err, job){
      if(err) return res.send(err);
      if(!job.isPermitted(req.user._id)){
        return res.status(401).send('Unauthorized');
      } else {
        Job.remove({_id: req.param('job_id')}, function(err){
          if(err) res.send(err);
          res.json(job);
        });
      }
    });
  });

};