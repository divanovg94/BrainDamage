timerModule.controller('timerController', function ($scope,$timeout) {
    $scope.clock='loading timer...';
    $scope.tickInterval= 1000;

    var tick = function(){
        $scope.clock = msToTimerSecondsConverter(tenSeconds)
        tenSeconds -= oneSecond;
        $timeout(tick,$scope.tickInterval);
    }
    $timeout(tick,$scope.tickInterval);
})

var tenSeconds = 10000;
var oneSecond = 1000;

function msToTimerSecondsConverter(s) {
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
//   s = (s - secs) / 60;
//   var mins = s % 60;
//   var hrs = (s - mins) / 60;
  return secs + ' seconds left';
}