var mongoose     = require('mongoose');
var moment       = require('moment');
var parseFormat  = require('moment-parseformat');
var _            = require('underscore');
var Schema       = mongoose.Schema;

var JobSchema   = new Schema({
  _userId: Schema.Types.ObjectId,
  name: String,
  state: String,
  title: String,
  location: String,
  link: String,
  contact: String,
  salary: Number,
  notes: String,
  interviewAt: Date,
  interviewLocation: String,
  updatedAt: Number,
  createdAt: Number
});

JobSchema.virtual('interviewAtString')
  .get(function(){
    var _moment = moment(this.interviewAt);
    var midnight = moment(_moment).startOf('day');

    var secondsSinceMidnight = _moment.diff(midnight, 'seconds');

    if(secondsSinceMidnight === 0){
      return _moment.format("ddd MMM Do YYYY");
    } else {
      return _moment.format("ddd MMM Do YYYY, h:mm a");
    }
  })
  .set(function(stringValue){
    var format = parseFormat(stringValue);
    var _moment = moment(stringValue, format);
    this.interviewAt = _moment.toDate();
    this.markModified('interviewAt');
  });

JobSchema.virtual('userId')
  .get(function(){
    this._userId;
  })
  .set(function(idOrString){
    if(_.isString(idOrString)) idOrString = mongoose.Types.ObjectId(idOrString);
    this._userId = idOrString;
  });

JobSchema.set('toJSON', {
  virtuals: true
});

JobSchema.methods = {
  isPermitted: function(userId){
    if(_.isString(userId)) userId = mongoose.Types.ObjectId(userId);
    return this._userId.equals(userId);
  }
}

mongoose.model('Job', JobSchema);