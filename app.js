angular.module('kaledos', [])
.controller('mainController', ['$scope', '$document', function($scope, $document) {
  $scope.senelis = {
    spalva: 0,
    daiktas: 0,
    transportas: 0,
    lytis: 0
  };
  $scope.spalvos = ["#e43f5e", "#0999d9", "#443083", "#00b48c", "#101010"];
  $scope.pradeta = false;
  $scope.complete = false;
  $scope.step = 0;
  $scope.start = function() {
    $scope.pradeta = true;
  };
  $scope.next = function() {
    $scope.step++;
    $scope.$apply();
  };
  $scope.back = function() {
    $scope.step--;
  };
  $scope.finish = function() {
    $scope.bodyStyle = {background: $scope.spalvos[$scope.senelis.spalva-1]};
    $scope.complete = true;
    $scope.$apply();
  };
  $scope.restart = function() {
    $scope.pradeta = false;
    $scope.complete = false;
    $scope.step = 0;
    $scope.bodyStyle = {};
    $scope.senelis = {
      spalva: 0,
      daiktas: 0,
      transportas: 0,
      lytis: 0
    };
  };
}])
.directive('pradzia', function(){
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'pradzia.html',
    link: function(scope, elem, attrs, controller) {
      elem.css("opacity", 0);
      elem.css("top", "55%");
      elem.animate({
        opacity: 1,
        top: "50%"
      }, 300);
    }
  };
})
.directive('klausimas', function(){
  return {
    restrict: 'A',
    link: function(scope, elem, attrs, controller) {
      elem.css("opacity", 0);
      elem.css("top", "55%");
      elem.animate({
        opacity: 1,
        top: "50%"
      }, 300);
      scope.ats = function(kl, ats) {
        scope.senelis[kl] = ats;
        elem.animate({
          opacity: 0,
          top: "45%"
        }, 200, function(){
          scope.next();
        });
      };
    }
  };
})
.directive('loader', function(){
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'loader.html',
    link: function(scope, elem, attrs, controller) {
      elem.css("opacity", 0);
      elem.animate({
        opacity: 1
      }, 300);
      setTimeout(scope.finish, 2500);
    }
  };
})
.directive('result', function(){
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'result.html',
    link: function(scope, elem, attrs, controller) {
      elem.css("opacity", 0);
      elem.animate({
        opacity: 1
      }, 500);
    }
  };
})
.directive('k0', function(){
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'k0.html'
  };
})
.directive('k1', function(){
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'k1.html'
  };
})
.directive('k2', function(){
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'k2.html'
  };
})
.directive('k3', function(){
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'k3.html'
  };
})
.directive('bottom', function(){
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'bottom.html'
  };
});
