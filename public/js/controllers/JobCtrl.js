angular.module('JobCtrl', [])
  .controller('JobController', function($scope, $http, $timeout) {

    var timeout = null;
    var secondsToWaitBeforeSave = 2;
    var isUpdateFromServer = false;

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
          isUpdateFromServer = true;
          $scope.job = data;
        })
        .error(function(data){
          console.log(data);
        })
    }

    $scope.setUpdate = function(newVal, oldVal){
      if (newVal != oldVal) {
        if (timeout) {
          $timeout.cancel(timeout);
        }
        if(isUpdateFromServer){
          isUpdateFromServer = false;
        } else {
          timeout = $timeout($scope.updateJob, secondsToWaitBeforeSave * 1000);
        }
      }
    }

    $scope.setState = function(newState){
      $scope.job.state = newState;
    }

    $scope.$watch('job.name', $scope.setUpdate);
    $scope.$watch('job.link', $scope.setUpdate);
    $scope.$watch('job.notes', $scope.setUpdate);
    $scope.$watch('job.state', $scope.setUpdate);


});