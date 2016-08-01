(function(){
	'use strict';

	angular
		.module('ng-app')
		.directive('navbar', nav);

		function nav(){
			var directive = {
				restrict: 'E',
				templateUrl: 'app/views/app/partials/navbar/navbar.html',
				controller: 'NavbarController',
				controllerAs: 'vm'
			};
			return directive;
		}
})();
