app.controller('ratingController', function($scope, $window, $rootScope) {

    if(!isNaN($scope.att.rating))
    {
        var rating = parseInt($scope.att.rating);

        if(rating == 5)
        {
            $scope.emblem = 'whatshot';
            // $scope.rating = "star star star star star";
        }
        
        for(var i = 0; i < rating; i++)
        {
            $scope.rating += "star ";
        }
    }

    $scope.openMap = function(attractionObject)
    { //http://maps.google.com/maps?q="+attractionObject.location+" "+attractionObject.name+"&loc:43.25911+-79.879494&z=15
        var win = $window.open("http://maps.google.com/maps?q="+attractionObject.location+" "+attractionObject.name+"&loc:"+attractionObject.lat+"+"+attractionObject.lng, '_blank');
        win.focus();   
    }

    $scope.removeAttractionFromBasket = function(att)
    {
        session.Attractions.Remove(att, function()
        {
            mc.Marker.Remove(att.id, function()
            {
                att.selected = false;
            })
        })
        $rootScope.selectedCounter = session.Attractions.Count();
    }
});