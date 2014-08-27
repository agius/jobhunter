angular.module('JobService', []).factory('Job', ['$http', function($http) {

  return {
    // call to get all nerds
    index : function(state, success) {
      if(!_.empty(state)){
        return $http.get('/api/jobs/' + state);
      }
      return $http.get('/api/jobs');
    },

    // call to POST and create a new geek
    create : function(jobData) {
      return $http.post('/api/jobs', jobData);
    },

    // call to DELETE a geek
    delete : function(id) {
      return $http.delete('/api/jobs/' + id);
    }
  }
  
}]);