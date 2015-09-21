var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope) {
    $scope.statusCtrl= "OK";
    console.log("LOG: myCtrl Status: " + $scope.statusCtrl);
    
    $scope.changeRisk = function(risk){
        $scope.risk = risk;
        //console.log("LOG: Risk: " + $scope.risk);
        $scope.updateSize();
    };
    
    $scope.changeComplexity = function(complexity){
        $scope.complexity = complexity;
        //console.log("LOG: Complexity: " + $scope.complexity);
        $scope.updateSize();
    };
    
    $scope.changeEffort = function(effort){
        $scope.effort = effort;
        //console.log("LOG: Effort: " + $scope.effort);
        $scope.updateSize();
    };
    
    $scope.updateSize = function(){
        $scope.tempSize = $scope.risk * ($scope.complexity + $scope.effort);
        console.log("temoSize: " + isNaN($scope.tempSize));
        if (typeof $scope.tempSize == "number") {
            $scope.size = $scope.tempSize;
        }
        console.log("LOG: Size: " + $scope.size);
        console.log("LOG: Size: " + $scope.size);      
    };
    
});

