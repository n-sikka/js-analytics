(function(){
  'use strict';

  angular
    .module('ng-app')
    .directive('miniTron', directiveFn);


    function directiveFn(){
      var directive = {
        restrict: 'EA',
        templateUrl: 'app/views/app/partials/mini-tron/mini-tron.html',
        scope: {
          title: '@',
          value: '='
        }
      }

      return directive;
    }

})();
