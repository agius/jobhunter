angular.module('JobCtrl', [])
  .controller('JobController', function($scope, $http, $timeout, $filter) {

    console.log('initializing job controller id: ' + $scope.job._id);
    var timeout = null;
    var secondsToWaitBeforeSave = 2;

    $scope.editing = [];

    $scope.isEditing = function(field){
      return $scope.editing.indexOf(field) >= 0;
    }

    $scope.toggleEditing = function(field){
      var index = $scope.editing.indexOf(field);
      if(index >= 0){
        $scope.editing.splice(index, 1);
      } else {
        $scope.editing.push(field);
      }
    }

    $scope.updateJob = function(){
      $http.put('/api/jobs/' + $scope.job._id, $scope.job)
        .success(function(data){
          console.log('job updated')
        })
        .error(function(data){
          console.log(data);
        })
    }

    $scope.setUpdate = function(newVal, oldVal){
      if (timeout) $timeout.cancel(timeout);
      if(newVal != oldVal){
        timeout = $timeout($scope.updateJob, secondsToWaitBeforeSave * 1000);
      }
    }

    $scope.setState = function(newState){
      $scope.job.state = newState;
    }

    $scope.$watchCollection('job', $scope.setUpdate);
});