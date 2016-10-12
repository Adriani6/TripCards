function MapController(city)
{
    //57.1716667 -2.1024999999999636
    this.markers = new Array();
    var self = this;
    this.Marker.ConvertAddress(city, function(latlang)
    {
        self.Map.LoadMap(latlang);
    })    
}

var map;

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
    Add: function(name, coords)
    {
        var id = (this.markers != undefined) ? this.markers.length : 0;
        var marker = new google.maps.Marker(
            {
                position: coords,
                map: map,
                title: name,
                animation: google.maps.Animation.DROP
            })

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