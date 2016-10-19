var MongoClient = require('mongodb').MongoClient;

function MongoDB(){};

MongoDB.prototype.findCity = function(city, callback)
{
    MongoClient.connect("mongodb://server.adriani6.co.uk:27017/tripcards-demo", function(err, db)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            db.collection("locations", function(err, collection)
            {
                if(err)
                    console.log(err);
                else
                {
                    var data = collection.findOne({location: {$regex: city, $options: "i"}}, function(err, doc)
                    {
                        console.log(doc);
                        callback(doc);
                    });
                    db.close();
                }  
            })
        }
    })
},

MongoDB.prototype.createHint = function(part, callback)
{
    MongoClient.connect("mongodb://server.adriani6.co.uk:27017/travelcards", function(err, db)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            db.collection("locations", function(err, collection)
            {
                if(err)
                    console.log(err);
                else
                {
                    var docs = [];

                    var data = collection.find({location: { $regex: part } }).limit(5).each(function(err, doc)
                    {
                        if(doc != undefined)
                            docs.push(doc.location);
                        else
                            callback(docs);
                    });
                    db.close();
                }  
            })
        }
    })   
}

MongoDB.prototype.misc = 
{
    getTotalLocations : function(cb)
    {
        MongoClient.connect("mongodb://server.adriani6.co.uk:27017/travelcards", function(err, db)
        {
            if(err)
            {
                console.log(err);
            }
            else
            {
                db.collection("locations", function(err, collection)
                {
                    if(err)
                        console.log(err);
                    else
                    {
                        collection.find({}).count(function(err, count)
                        {
                            cb(count);
                        });
                        db.close();
                    }  
                })
            }
        })   
    }
}

module.exports = MongoDB;