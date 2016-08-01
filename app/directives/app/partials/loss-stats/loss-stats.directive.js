(function(){
  'use strict';

  angular
    .module('ng-app')
    .directive('lossStats', directiveFn);


    function directiveFn( $timeout){
      var directive = {
        restrict: 'EA',
        templateUrl: 'app/views/app/partials/loss-stats/loss-stats.html',
        scope: {
          data: '='
        },
        link: linkFunction
      }

      return directive;

      function linkFunction(scope){


        var lossScore = [],
            opponent = [],
            totalCount = 0;

        scope.data.forEach(function(year){

            if (!year.length == 0) {
              year.forEach(function(match){
                if (match.score.getScore() > 100) {
                  opponent.push(match.opponent)
                  lossScore.push(match.score.getScore())
                  totalCount++;
                }
              })
            }

        })



        var chartArrayData = [['Opponent', 'Score']];

        for (var i = 0; i < totalCount; i++) {
          var array = [opponent[i], lossScore[i]];
          chartArrayData.push(array);
        }

        google.charts.load('current', {'packages':['bar', 'line']});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
          var data = google.visualization.arrayToDataTable(chartArrayData);

          var options = {
            chart: {
              title: "Even when India Lost, Sachin still was AWESOME!",
              legend: { position: "bottom" }
            }
          };

          var chart = new google.charts.Bar(document.getElementById('lossChart'));

          chart.draw(data, options);


        }


      }

    }

})();
