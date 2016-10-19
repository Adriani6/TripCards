var token = "AIzaSyC9J6YlkgJxlh3tnjszUBwqfOrJT6ACxIE";

function Places()
{}

Places.prototype.getPlaces = function($scope, $http, attraction, city)
{
    var place = attraction + " " + city;
    var url = "/getPlace/"+city+"/"+attraction;
    $http.get(url)
    .then(function(response) {
        console.log(response.data.results[0]);
    });
}