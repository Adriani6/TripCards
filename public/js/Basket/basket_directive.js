var totalhrs = 0;
    var totalmins = 0;

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

    $scope.uncheck = function(att)
    {
        if(att.selected)
        {
            att.selected = false;
            if(att.startHours)
                totalhrs -= att.startHours;
            if(att.startMinutes)
                totalmins -= att.startMinutes;
        }
        else
        {
            att.selected = true;
            if(att.startHours)
                totalhrs += att.startHours;
            if(att.startMinutes)
                totalmins += att.startMinutes;
        }
        $rootScope.totalTime = totalhrs + " hours and " + totalmins + " minutes.";
    }

    $scope.remove = function(att)
    {
        att.selected = false;
        if(att.startHours)
            totalhrs -= att.startHours;
        if(att.startMinutes)
            totalmins -= att.startMinutes;
        this.removeAttractionFromBasket(att);
        $rootScope.totalTime = totalhrs + " hours and " + totalmins + " minutes.";
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

    $rootScope.totalTime = totalhrs;

    $scope.updateTime = function(att, $evt)
    {
        totalhrs = 0;
        att.startHours = parseInt($evt.target.value);
        for(var i = 0; i < selected_attractions.length; i++)
        {
            if(selected_attractions[i].selected && selected_attractions[i].startHours != undefined)
                totalhrs += parseInt(selected_attractions[i].startHours);
        }

        $rootScope.totalTime = totalhrs + " hours and " + totalmins + " minutes.";
    }

    $scope.updateMinutes = function(att, $evt)
    {
        totalmins = 0;
        att.startMinutes = parseInt($evt.target.value);

        for(var i = 0; i < selected_attractions.length; i++)
        {
            if(selected_attractions[i].selected && selected_attractions[i].startMinutes != undefined)
                totalmins += parseInt(selected_attractions[i].startMinutes);
        }

        while(totalmins > 59)
        {
            totalhrs += 1;
            totalmins -= 60;
            att.startMinutes = parseInt(totalmins);
            att.startHours = parseInt(totalhrs);
        }

        $rootScope.totalTime = totalhrs + " hours and " + totalmins + " minutes.";
    }
});