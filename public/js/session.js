function Session()
{
    
}

var selected_attractions = new Array();

Session.prototype.Attractions = 
{
    Add : function(attraction)
    {
        selected_attractions.push(attraction);
    },
    Remove : function(attraction)
    {
        //Remove Attraction from list
    },
    Count : function()
    {
       return selected_attractions.length;
    }
}