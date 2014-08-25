var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var JobSchema   = new Schema({
  name: String,
  state: String,
  link: String,
  contact: String,
  notes: String,
  interviewAt: Number,
  interviewLocation: String,
  updatedAt: Number,
  createdAt: Number
});

var Job = mongoose.model('Job', JobSchema);

module.exports = Job;