(function(){
  'use strict';

  angular
    .module('ng-app')
    .directive('centuryStats', directiveFn);


    function directiveFn( $timeout){
      var directive = {
        restrict: 'EA',
        templateUrl: 'app/views/app/partials/century-stats/century-stats.html',
        scope: {
          centuries: '=',
          halfcenturies: '='
        },
        link: linkFunction
      }

      return directive;

      function linkFunction(scope){


        var hundredLabel = Object.keys(scope.centuries);
        var fiftyLabel = Object.keys(scope.centuries);

        var hundreds = []
        var fiftys = []


        scope.centuries.forEach(function(year){
            hundreds.push(year.length)
        })

        scope.halfcenturies.forEach(function(year){
            fiftys.push(year.length)
        })

        var totalCount = hundreds.length > fiftys.length ? hundreds.length : fiftys.length;

        var chartArrayData = [['Year', 'Centuries', 'Half Centuries']];

        for (var i = 0; i < totalCount; i++) {
          var array = [hundredLabel[i], hundreds[i], fiftys[i]];
          chartArrayData.push(array);
        }

        // google.charts.load('current', {'packages':['line']});
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
          var data = google.visualization.arrayToDataTable(chartArrayData);

          var options = {
            chart: {
              title: "Sachin's Career Centuries and Half Centuries",
              legend: { position: "bottom" }
            }
          };

          var lineChart = new google.charts.Line(document.getElementById('centuryChart'));

          lineChart.draw(data, options);


        }


      }

    }

})();
