(function(){
  'use strict';

  angular
    .module('ng-app')
    .directive('careerStats', directiveFn);


    function directiveFn(){
      var directive = {
        restrict: 'EA',
        templateUrl: 'app/views/app/partials/career-stats/career-stats.html',
        scope: {
          item: '=data'
        }
      }

      return directive;

    }

})();
