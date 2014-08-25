angular.module('job-hunter', [
  'ngRoute',
  'appRoutes',
  'xeditable',
  'MainCtrl',
  'JobsCtrl',
  'JobCtrl',
  'JobService'
]).config(function($logProvider){
  $logProvider.debugEnabled(true);
}).run(function(editableOptions){
  editableOptions.theme = 'bs3';
});
