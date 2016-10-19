var express = require("express");
var app = express();
var MongoDB = require("./utils/mongo.js");
var engines = require('consolidate');
var $ = require('jquery')(require("jsdom").jsdom().defaultView);
var http = require('https');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/api/city/:city', function (req, res) 
{
    var mongo = new MongoDB();
    var city = req.params.city;
    
    if(city != undefined)
    {
        mongo.findCity(city, function(data)
        {
            if(!data)
            {
                res.send("No Results.");
            }
            else
            {
                res.send(data);
            }
        })
    }
    else
    {
        res.render("index");
    }
})

app.get('/api/hints/city/:letter', function(req, res)
{
    var mongo = new MongoDB();
    mongo.createHint(req.params.letter, function(hints)
    {
        res.send(hints);
    });
})

app.get('/', function(req, res)
{
    var count = new MongoDB().misc.getTotalLocations(function(count)
    {
        res.render("index", {"cities" : count});
    });
})

app.get('/results', function(req, res)
{
    res.render("results");
})

app.get('/getPlace/:city/:attraction', function(req, res)
{
    if(req.params.city != undefined && req.params.attraction != undefined)
    {
        var queryString = escape(req.params.attraction + " " + req.params.city);

        var str = "";
        http.get({
        hostname: 'maps.googleapis.com',
        path: "/maps/api/place/textsearch/json?query="+queryString+"&key=AIzaSyC9J6YlkgJxlh3tnjszUBwqfOrJT6ACxIE",
        method: "GET",
        agent: false  // create a new agent just for this one request
        }, (re) => {
            re.on('data', function(d) {
                str += d;
            });
            re.on('end', function(d) {
                res.send(str);
            });
        })
    }
})

var server = app.listen(1234);