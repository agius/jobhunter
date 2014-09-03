angular.module('StateFilter', []).filter('jobstate', function($filter){
  return function(jobs, state){
    var out = [];
    switch(state){
      case 'active':
        out = $filter('filter')(jobs, {state: '!cancelled'});
        break;
      case 'considering':
        _.each(jobs, function(_job){
          if(_.empty(_job.state) || _job.state == 'base'){
            out.push(_job);
          }
        });
        break;
      default:
        out = $filter('filter')(jobs, {state: state});
    }
    return out;
  }
});