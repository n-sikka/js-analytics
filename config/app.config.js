(function(){

    angular
      .module('ng-app')
      .config(function(){

      //helper functions

      String.prototype.isNotOut = function() {
        return this.includes('*');
      };

      String.prototype.isValidNumber = function() {
        return ! isNaN(parseInt(this));
      };

      String.prototype.getScore = function() {
        var score = parseInt(this);
        return ! isNaN(score) ? score : 0;
      };

      String.prototype.isWin = function() {
        return this == 'won' ? true : false;
      };

      String.prototype.isLoss = function() {
        return this == 'lost' ? true : false;
      };

      String.prototype.isDraw = function() {
        return this == 'tied' ? true : false;
      };

      String.prototype.hasResult = function() {
        return this  == 'n/r' ? false : true;
      }

    });

})();
