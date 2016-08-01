(function(){

  angular
  .module('ng-app')
  .controller('HomeController' , controller);

  function controller(MatchService){
    var vm = this;


    vm.careerStats = function(){
      MatchService.getStat().then(function(result){
        vm.stats = result;
      });
    }

    vm.careerCenturies = function(){
      MatchService.getCenturyByYear().then(function(result){
        vm.century = result;
      })
      MatchService.getHalfCenturiesByYear().then(function(result){
        vm.hcentury = result;
      })
    }

    vm.losses = function(){
      MatchService.getLossWithHighScore().then(function(result){
        vm.losses = result
      })
    }

    vm.won = function(){
      MatchService.getWinWithHighScore().then(function(result){
        vm.wins = result
      })
    }

  }


})();
