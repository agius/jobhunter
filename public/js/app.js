angular.module('job-hunter', [
  'ngRoute',
  'appRoutes',
  'xeditable',
  'MainCtrl',
  'JobsCtrl',
  'JobCtrl',
  'JobService'
])
.constant('_', window._)
.config(function($logProvider){
  $logProvider.debugEnabled(true);
})
.run(function($rootScope, editableOptions){
  $rootScope._ = window._;
  editableOptions.theme = 'bs3';
});
