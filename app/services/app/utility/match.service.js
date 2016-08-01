(function(){
  'use strict';

  angular
    .module('ng-app')
    .service('MatchService', matchService)

    function matchService(DATA_CSV, $http, $q){

      var service = this;


      service.getAll = function(){
          var deferred = $q.defer();

          $http.get(DATA_CSV)
            .then(function success(response){
              var data;
              Papa.parse(response.data, {
                header: true,
                complete: function(results) {
                  data = results;
                }
              })
              deferred.resolve(data);
            }, function error(response){
              console.log(response);
            })

          return deferred.promise;
      }


      service.getStat = function(){
        var deferred = $q.defer();

        service.getAll()
        .then(function success(response){

          var res = response.data,
              totalRunsArr = [],
              totalRuns = 0,
              outCount = 0,
              totalWickets = 0,
              totalCatches = 0,
              notOutCount = 0,
              totalCenturies = [],
              totalHalfCenturies = [];

          for (var i = 0; i < res.length-1; i++) {
            if(res[i].batting_score.isValidNumber()) {
                var score = res[i].batting_score.getScore()
                totalRunsArr.push(score);

                if(res[i].batting_score.isNotOut())
                  notOutCount++;
                else
                  outCount++;


                if(score >= 100)
                    totalCenturies.push(score);
                else if(score >= 50)
                    totalHalfCenturies.push(score);
            }

            if(res[i].wickets.isValidNumber() && parseInt(res[i].wickets) > 0) {
              totalWickets += parseInt(res[i].wickets);
            }

            if(res[i].catches.isValidNumber() && parseInt(res[i].catches) > 0) {
              totalCatches += parseInt(res[i].catches);
            }
          }

        //   //get total runs (sum)
          function getSum(total, num) {
              return total + num;
          }

          var stats = {
            runs: totalRunsArr.reduce(getSum),
            avg: parseFloat((totalRunsArr.reduce(getSum)/outCount).toFixed(2)),
            notOut: notOutCount,
            wickets: totalWickets,
            catches: totalCatches,
            centuries: totalCenturies.length,
            halfCenturies: totalHalfCenturies.length,
            highest : Math.max(...totalCenturies)
          }

          deferred.resolve(stats)

        }, function error(response){
          console.log(response.statusText);
        })

        return deferred.promise;

      },


      service.getMatchResults = function(){
        var deferred = $q.defer();

        service.getAll()
          .then(function success(response){

            var res = response.data,
                matchResults = [],
                totalLost = 0,
                totalWon = 0,
                totalTied = 0,
                otherRes = 0;

            for (var i = 0; i < res.length -1; i++) {

              if(res[i].match_result.isWin()){
                totalWon++
              } else if(res[i].match_result.isLoss()){
                totalLost++
              } else if(res[i].match_result.isDraw()){
                totalTied++
              } else {
                otherRes++
              }

            }

            var matchStats = {
              won: totalWon,
              lost: totalLost,
              tied: totalTied,
              no_result:otherRes
            }

            deferred.resolve(matchStats)

          }, function error(response){

          })

          return deferred.promise;
      },


      service.getCenturyByYear = function(){

        var deferred = $q.defer();

        service.getAll()
            .then(function success(response){

              var data = response.data;

              var centuries = []



              for (var i = 0; i < data.length-1; i++) {

                var key = (new Date(Date.parse(data[i].date))).getFullYear()

                if(typeof(centuries[key]) == "undefined")
                  centuries[key] = []

                if(data[i].batting_score.isValidNumber()){
                  if (data[i].batting_score.getScore() >= 100) {
                    var obj = {
                      score : data[i].batting_score,
                      opponent : data[i].opposition
                    }
                    centuries[key].push(obj);
                  }
                }

              }

              deferred.resolve(centuries)

            }, function error(response){
              console.log(response);
            })

            return deferred.promise;

      },


      service.getHalfCenturiesByYear = function(){
        var deferred = $q.defer();

        service.getAll()
            .then(function success(response){

              var data = response.data;

              var half_centuries = []
              for (var i = 0; i < data.length-1; i++) {
                var key = (new Date(Date.parse(data[i].date))).getFullYear()


                if (typeof(half_centuries[key]) == "undefined")
                  half_centuries[key] = [];

                if(data[i].batting_score.isValidNumber()) {

                  if(data[i].batting_score.getScore() >= 50 && data[i].batting_score.getScore() < 100) {

                    var obj = {
                      score : data[i].batting_score,
                      opponent : data[i].opposition
                    }
                    half_centuries[key].push(obj);

                  }

                }

              }

              deferred.resolve(half_centuries)

            }, function error(response){
              console.log(response);
            })

            return deferred.promise;
      }


      service.getResultByYear = function(){
        var deferred = $q.defer();

        service.getAll()
            .then(function success(response){

              var data = response.data;

              var results = []

              for (var i = 0; i < data.length-1; i++) {
                var key = (new Date(Date.parse(data[i].date))).getFullYear()


                if (typeof(results[key]) == "undefined")
                  results[key] = [];

                if(data[i].match_result.hasResult())
                  results[key].push(data[i].match_result)

              }

              deferred.resolve(results)

            }, function error(response){
              console.log(response);
            })

            return deferred.promise;
      },


      service.getLossWithHighScore = function(){
        var deferred = $q.defer();

        service.getAll()
          .then(function success(response){

            var res = response.data,
                losses = [];

            for (var i = 0; i < res.length - 1; i++) {

              if(res[i].match_result.isLoss()){
                var key = (new Date(Date.parse(res[i].date))).getFullYear()

                if (typeof(losses[key]) == "undefined")
                  losses[key] = []

                if(res[i].batting_score.isValidNumber()){
                  if (res[i].batting_score.getScore() >= 50) {
                    var obj = {
                      score : res[i].batting_score,
                      opponent : res[i].opposition,
                      result : res[i].match_result
                    }
                    losses[key].push(obj);
                  }
                }

              }

            }

            deferred.resolve(losses)

          }, function error(response){
            console.log(response);
          })

          return deferred.promise;
      },


      service.getWinWithHighScore = function(){
        var deferred = $q.defer();

        service.getAll()
          .then(function success(response){

            var res = response.data,
                wins = [];

            for (var i = 0; i < res.length - 1; i++) {

              if(res[i].match_result.isWin()){
                var key = (new Date(Date.parse(res[i].date))).getFullYear()

                if (typeof(wins[key]) == "undefined")
                  wins[key] = []

                if(res[i].batting_score.isValidNumber()){
                  if (res[i].batting_score.getScore() >= 50) {
                    var obj = {
                      score : res[i].batting_score,
                      opponent : res[i].opposition,
                      result : res[i].match_result
                    }
                    wins[key].push(obj);
                  }
                }

              }

            }

            deferred.resolve(wins)

          }, function error(response){
            console.log(response);
          })

          return deferred.promise;
      }


      return service;


    }

})();
