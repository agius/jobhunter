angular.module('job-hunter', [
  'ngRoute',
  'appRoutes',
  'xeditable',
  'ui.bootstrap',
  'JobService',
  'JobHunterFilters',
  'MainCtrl',
  'JobsCtrl',
  'JobCtrl'
])
.constant('_', window._)
.config(function($logProvider){
  $logProvider.debugEnabled(true);
})
.run(function($rootScope, editableOptions){
  $rootScope._ = window._;
  editableOptions.theme = 'bs3';
});
