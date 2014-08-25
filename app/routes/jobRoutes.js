module.exports = function(app) {

  var Job = require('../models/job.js');

  // server routes ===========================================================
  // handle things like api calls
  // authentication routes

  // sample api route
  app.get('/api/jobs', function(req, res) {
    // use mongoose to get all jobs in the database
    Job.find(function(err, jobs) {
      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err) res.send(err);
      res.json(jobs); // return all nerds in JSON format
    });
  });

  app.get('/api/job/:job_id', function(req, res) {
    Job.findById(req.params.job_id, function(err, job) {
      if (err) res.send(err);
      res.json(job); // return all nerds in JSON format
    });
  });

  app.post('/api/jobs', function(req, res){
    var job = new Job();
    job.name = req.body.name;

    job.save(function(err, job){
      if (err) req.send(err);
      console.log(job);
    });

    res.json(job);
  });

  app.put('/api/jobs/:job_id', function(req, res){
    Job.findById(req.params.job_id, function(err, job){
      if(err) res.send(err);
      job.name = req.body.name;
      job.save(function(err){
        if(err) req.send(err);
        res.json(job);
      });
    });
  });

  app.delete('/api/jobs/:job_id', function(req, res){
    Job.remove({ _id: req.params.job_id}, function(err, job){
      if(err) res.send(err);
      res.json(job);
    });
  });

};