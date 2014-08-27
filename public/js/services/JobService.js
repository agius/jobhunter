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
});