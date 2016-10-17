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
    $scope.fabClick = function()
    {
        console.log("Alo Blyet");
    }
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

    $scope.isSelected = function(section) {
        return section.selected === true;
    }

    $scope.clickMarker = function($event, attraction)
    {
        if(attraction.selected)
        {
            attraction.selected = false;
            session.Attractions.Remove(attraction, function()
            {
                mc.Marker.Remove(attraction.id, function()
                {
                    $mdToast.show($mdToast.simple()
                    .textContent("Removed " + attraction.name)
                    .hideDelay(3000)
                    .position('top right'));
                });
            })
            $rootScope.selectedCounter = session.Attractions.Count();
        }
        else
        {
            mc.Marker.ConvertAddress(attraction.address, function(latLang)
            { 
                mc.Marker.Add(attraction.name, latLang, session.Attractions.Count());
                $mdToast.show($mdToast.simple()
                .textContent("Added " + attraction.name)
                .hideDelay(3000)
                .position('top right'));

                attraction.id = session.Attractions.Count();
                session.Attractions.Add(attraction);
                $rootScope.selectedCounter = session.Attractions.Count();

                attraction.selected = true;
                
            });
        }      
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