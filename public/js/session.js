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
    Remove : function(attr, cb)
    {
        function removeClosure(attraction)
        {
            for(var i = 0; i < selected_attractions.length; i++)
            {
                if(attraction.id == selected_attractions[i].id)
                {
                    selected_attractions.splice(i, 1);
                    cb();
                }
            }
        }
        //Remove Attraction from list
        removeClosure(attr);
        
    },
    Count : function()
    {
       return selected_attractions.length;
    },
    ShowBasket : function()
    {
        
    }
}