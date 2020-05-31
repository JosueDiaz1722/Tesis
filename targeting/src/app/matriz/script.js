
angular
.module('myModule', [])
.controller('MyCtrl', ['$scope', function($scope) {

  $scope.params = ['par1', 'par2', 'par3', 'par4', 'par5'];
  
  $scope.modes = ['mode1', 'mode2', 'mode3'];
  
  $scope.getNumCombinations = function() {
    return $scope.params.length * $scope.modes.length;
  };
  
  $scope.getCombinationsArray = function() {
    var combinations = [];
    for (var i = 0; i < $scope.getNumCombinations(); i++) {
      combinations.push(i)
    }
    return combinations;
  };
  
  $scope.getModule = function(index){
    return index % $scope.params.length;
  };
  
}]);
