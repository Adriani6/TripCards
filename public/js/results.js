var app = angular.module('results', ['ngRoute', 'ngMaterial']).config(function($locationProvider) {
        $locationProvider.html5Mode(true);
    });

app.directive('finishedLoadingItems', function() {
  return function(scope, element, attrs) {
    if (scope.$last){
      // iteration is complete, remove loading screen.
      angular.element(document.querySelector("#splashloadingscreen"))[0].style.display = "none";
      //angular.element('#splashloadingscreen').css('display', 'none');
    }
  };
});

app.controller('searchedCity', function($scope, $location, $rootScope) 
{
    $scope.cityValue = $location.search().city;
    $rootScope.selectedCounter = 0;
});

app.controller('attractionCTRL', function($scope, $http, $location, $mdToast, $rootScope)
{
    var val = $location.search().city

    var mc = new MapController(val);
    var session = new Session();

    $http.get('/api/city/' + val, {
    }).then(function(response){
        var attractions = [];        
        
        /*var geocoder = new google.maps.Geocoder();
        geocoder.geocode( { 'address': response.data.attractions[0].address}, function(results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            console.log(latitude, longitude);
            } 
        });*/
        for(var i = 0; i < response.data.attractions.length; i++)
        {
            if(!containsObject(response.data.attractions[i], attractions))
            {
                attractions.push(response.data.attractions[i]);
            }
        }

        $scope.attractions = attractions;
    }, function()
    {
        console.log("Error.");
    });

    $scope.addMarker = function(attraction)
    {
        mc.Marker.ConvertAddress(attraction.address, function(latLang)
        { 
            mc.Marker.Add(attraction.name, latLang);
            $mdToast.show($mdToast.simple()
            .textContent("Added " + attraction.name)
            .hideDelay(3000)
            .position('top right'));

            session.Attractions.Add(attraction);
            $rootScope.selectedCounter = session.Attractions.Count();
        });
    }
    
})

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].name === obj.name) {
            return true;
        }
    }

    return false;
}