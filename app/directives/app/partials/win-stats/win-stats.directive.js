(function(){
  'use strict';

  angular
    .module('ng-app')
    .directive('winStats', directiveFn);


    function directiveFn( $timeout){
      var directive = {
        restrict: 'EA',
        templateUrl: 'app/views/app/partials/win-stats/win-stats.html',
        scope: {
          data: '='
        },
        link: linkFunction
      }

      return directive;

      function linkFunction(scope){


        var winScore = [],
            opponent = [],
            totalCount = 0;

        scope.data.forEach(function(year){

            if (!year.length == 0) {
              year.forEach(function(match){
                if (match.score.getScore() > 100) {
                  opponent.push(match.opponent)
                  winScore.push(match.score.getScore())
                  totalCount++;
                }
              })
            }

        })

        var chartArrayData = [['Opponent', 'Score']];

        for (var i = 0; i < totalCount; i++) {
          var array = [opponent[i], winScore[i]];
          chartArrayData.push(array);
        }

        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
          var data = google.visualization.arrayToDataTable(chartArrayData);

          var options = {
            chart: {
              title: "And when India Won, Sachin was anyways AWESOME!",
              legend: { position: "bottom" },
              vAxis :{
                maxValue : 210
              }
            }
          };

          var chart = new google.charts.Bar(document.getElementById('winChart'));

          chart.draw(data, options);


        }


      }

    }

})();
