angular.module('CapitalizeFilter', []).filter('capitalize', function(){
  return function(input){
    if(_.empty(input)){ return ''; }
    return input.replace(/([^\W_]+[^\s-]*) */g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
});