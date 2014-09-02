angular.module('JobService', []).service('JobService', function($http) {

  this.index = function(state) {
    if(!_.empty(state)){
      return $http.get('/api/jobs/' + state);
    }
    return $http.get('/api/jobs');
  }

  this.get = function(id){
    return $http.get('/api/job/' + id);
  }
   
  this.create = function(jobData) {
    return $http.post('/api/jobs', jobData);
  }

  this.update = function(jobData) {
    return $http.put('/api/job/' + jobData._id, jobData);
  }

  this.delete = function(id) {
    return $http.delete('/api/job/' + id);
  }

  this.states = {
    base: {
      percent: 0,
      progressClass: 'success',
      progressLabel: 'Considering',
      nextLabel: 'Contacted',
      next: 'emailed'
    },
    emailed: {
      percent: 20,
      progressClass: 'success',
      progressLabel: 'Contacted',
      nextLabel: 'Got Response',
      next: 'responded'
    },
    responded: {
      percent: 40,
      progressClass: 'success',
      progressLabel: 'Responded',
      nextLabel: 'Got Interview',
      next: 'interview'
    },
    interview: {
      percent: 60,
      progressClass: 'success',
      progressLabel: 'Will Interview',
      nextLabel: 'Got An Offer',
      next: 'offered'
    },
    offered: {
      percent: 80,
      progressClass: 'success',
      progressLabel: 'Received Offer',
      nextLabel: 'Accepted Offer',
      next: 'accepted'
    },
    accepted: {
      percent: 100,
      progressClass: 'success',
      progressLabel: 'Offer Accepted'
    },
    cancelled: {
      percent: 0,
      progressClass: 'danger',
      progressLabel: "Didn't work out"
    }
  };

  this.getStates = function(){
    return angular.extend({}, this.states);
  }

  this.stateNames = function(){
    return _.keys(this.states);
  }
});