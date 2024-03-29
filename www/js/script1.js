// Code goes here
var app = angular.module('bmiApp', []);

app.controller('bmiController', function ($scope) {
    $scope.units = "imperial";
    $scope.catClass = "default";
    $scope.catTitle = "Unknown";
    $scope.bmi = 0;
    
    $scope.$watch('weight_kg', function (newVal, oldVal, scope) {
      if(newVal) { 
        //scope.bmi = newVal;
        scope.bmi = (!!scope.height_cm) ? ((newVal * 10000)/(scope.height_cm * scope.height_cm)) : 0.0;
      } else {
        scope.bmi = 0;
      }
    });
    
    $scope.$watch('height_cm', function (newVal, oldVal, scope) {
      if(newVal) { 
        //scope.bmi = newVal;
        scope.bmi = (!!newVal) ? ((scope.weight_kg * 10000) / (newVal * newVal)) : 0.0;
      } else {
        scope.bmi = 0;
      }
    });
    
    
    $scope.$watch('bmi', function (newVal, oldVal, scope) {
      if(newVal) { 
        if((newVal <= 24) && (newVal >= 19)) {
          scope.catClass = "success";
          scope.catTitle = "Normal";
        } else if((newVal < 19) && (newVal > 0)) {
          scope.catClass = "danger";
          scope.catTitle = "Underweight";
        } else if(newVal > 24) {
          scope.catClass = "danger";
          scope.catTitle = "Overweight";
        } else {
          scope.catClass = "default";
          scope.catTitle = "Unknown";
        }
      } else {
        scope.catClass = "default";
        scope.catTitle = "Unknown";
      }
    });
    
    
});