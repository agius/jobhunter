// in a larger app, I would separate these out into real controllers
// in a toy app... I will be lazy

module.exports = function(app) {

  var Job = require('../models/job.js');

  app.get('/api/jobs', function(req, res) {
    // use mongoose to get all jobs in the database
    Job.find().sort('+createdAt').exec(function(err, jobs) {
      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err) res.send(err);
      res.json(jobs); // return all nerds in JSON format
    });
  });

  app.get('/api/job/:job_id', function(req, res) {
    Job.findById(req.param('job_id'), function(err, job) {
      if (err) res.send(err);
      res.json(job); // return all nerds in JSON format
    });
  });

  app.post('/api/jobs', function(req, res){
    var now = new Date().getTime();
    var job = new Job();
    job.name = req.body.name;
    job.createdAt = now;
    job.updatedAt = now;

    job.save(function(err, job){
      if (err) req.send(err);
      console.log(job);
    });

    res.json(job);
  });

  app.put('/api/jobs/:job_id', function(req, res){
    Job.findById(req.param('job_id'), function(err, job){
      if(err) res.send(err);

      job.name = req.body.name;
      job.state = req.body.state;
      job.contact = req.body.contact;
      job.link = req.body.link;
      job.notes = req.body.notes;
      job.interviewLocation = req.body.interviewLocation;
      job.updatedAt = new Date().getTime();
      job.save(function(err){
        if(err) req.send(err);
        res.json(job);
      });
    });
  });

  app.delete('/api/jobs/:job_id', function(req, res){
    Job.remove({ _id: req.param('job_id')}, function(err, job){
      if(err) res.send(err);
      res.json(job);
    });
  });

};