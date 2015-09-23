var synergyApp = angular.module('sinergy', ['ui.bootstrap']);
var traditionalApp = angular.module('traditional', ['ui.bootstrap']);
synergyApp.controller('sinergyCtrl', function ($scope) {
    $scope.statusCtrl = "OK";
    console.log("LOG: myCtrl Status: " + $scope.statusCtrl);
    
    $scope.risk = 1;
    $scope.effort = 1;
    $scope.complexity = 1;
    $scope.size  = "Select value above"
    
    $scope.$watch( 'risk', function(newValue, oldValue){
        //console.log("LOG: Size: " + $scope.risk);
        $scope.updateSize();
    });
    
    $scope.$watch( 'effort', function(newValue, oldValue){
        //console.log("LOG: Size: " + $scope.effort);
        $scope.updateSize();
    });
    
    $scope.$watch( 'complexity', function(newValue, oldValue){
        //console.log("LOG: Size: " + $scope.complexity);
        $scope.updateSize();
    });
                         
    $scope.updateSize = function(size){  
        $scope.size = $scope.risk * ($scope.complexity + $scope.effort);
        console.log("LOG: Size: " + $scope.size);
    };                     
                    
   /* 
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
    */
    
});

