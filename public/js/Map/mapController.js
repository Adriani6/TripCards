/**
* @param {string} city - City String which gets converted to LangLat for Maps API.
*/
function MapController(city)
{
    //57.1716667 -2.1024999999999636
    var self = this;
    this.Marker.ConvertAddress(city, function(latlang)
    {
        self.Map.LoadMap(latlang);
    })    
}

var map,
markers = new Array();

MapController.prototype.Map = 
{
    LoadMap : function(latlang, cb)
    {
        console.log(latlang);
        var mapCanvas = document.getElementById("map");
        var mapOptions = {
          center: latlang, 
          mapTypeControl: false,
          fullscreenControl: false,
          zoom: 10
          }
          map = new google.maps.Map(mapCanvas, mapOptions);
          
          if(cb != undefined)
            cb();
    }
}

MapController.prototype.Marker = 
{
    Add: function(name, coords, id)
    {
        var marker = new google.maps.Marker(
            {
                id: id,
                position: coords,
                map: map,
                title: name,
                animation: google.maps.Animation.DROP
            })

        markers.push(marker);
        this.CreateListener(marker, id, name);
    },

    CreateListener: function(marker, id, content)
    {
        var infowindow = new google.maps.InfoWindow();

        google.maps.event.addListener(marker, 'click', (function(marker, id) {
            return function() {
                infowindow.setContent(content);
                infowindow.open(map, marker);
            }
        })(marker, id));
    },

    Remove: function(mid, cb)
    {
        function removeClosure(id)
        {
            for(var i = 0; i < markers.length; i++)
            {
                if(id == markers[i].id)
                {
                    markers[i].setMap(null);
                    markers.splice(i, 1);
                }
                else
                {
                    markers[i].setMap(map);
                }
            }
            cb();
        }
        removeClosure(mid);
    },

    ConvertAddress: function(address, cb)
    {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode( { 'address': address}, function(results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
            var latitude = results[0].geometry.location.lat();
            var longitude = results[0].geometry.location.lng();
            cb(new google.maps.LatLng(latitude, longitude));
            } 
        })
    }
}