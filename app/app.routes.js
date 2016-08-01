(function() {
  'use strict';

  angular
    .module('ng-app')
    .config(routerConfig);

  function routerConfig($stateProvider, $urlRouterProvider) {
    var _dirPath = 'app/views/app/';

    $urlRouterProvider.otherwise('/');
    $urlRouterProvider.when('/', '/home');

    $stateProvider
      .state('base', {
        abstract: true,
        url: '',
        templateUrl: 'app/views/base.html'
      })
      .state('home', {
        url: '/home',
        parent: 'base',
        views: {
          "content": {
            templateUrl: _dirPath + 'pages/home/home.html',
            controller:'HomeController',
            controllerAs:'vm'
          }
        }
      });

  }

})();
