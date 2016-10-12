var app = angular.module('app', []);
angular.module('app').config(['$controllerProvider', function($controllerProvider)
{
    $controllerProvider.allowGlobals();
}])

function searchController($scope) {
      $scope.greeting = "Welcome!";
};

var app2 = angular.module('app', ['ui.bootstrap']);

app2.controller('searchController', function($scope, $http, $window) {

    $scope.submitQuery = function()
    {
        if($scope.input == undefined || $scope.input == "")
        {
            $scope.alerts = [
                { type: 'danger', msg: "Don't leave the query empty!", dismiss: 1000 }
            ];
            //Doesnt want to disappear.
        }
        else
        {
            //Add Routing to /results with parameters rather than form submission.
            $window.location.href = "/results?city=" + $scope.input;
        }
    }

  var _selected;

  $scope.selected = undefined;

  $scope.getLocation = function(val) {
    return $http.get('/api/hints/city/' + val, {
    }).then(function(response){
      return response.data;
    });
  };

  $scope.ngModelOptionsSelected = function(value) {
    if (arguments.length) {
      _selected = value;
    } else {
      return _selected;
    }
  };

  $scope.modelOptions = {
    debounce: {
      default: 500,
      blur: 250
    },
    getterSetter: true
  };
});