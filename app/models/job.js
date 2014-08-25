var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var JobSchema   = new Schema({
  name: String,
  link: String,
  state: String,
  notes: String,
  interviewDate: Number,
  updatedAt: Number,
  createdAt: Number
});

var Job = mongoose.model('Job', JobSchema);

module.exports = Job;