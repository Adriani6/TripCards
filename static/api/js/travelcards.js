$(document).ready(function()
{
    $( "#query" ).submit(function( event ) {
        event.preventDefault();
        $("#output").html("");
        queryAPI($("#queryString").val());
    });

    function queryAPI(city)
    {
        $.ajax({
            dataType: "json",
            url: "api?city="+city,
        }).done(function(data)
        {
            //console.log(data);
            $(data.attractions).each(function(index)
            {
                $(data.attractions[index]).each(function(i)
                {
                    $("#output").append($(this)[0].name + "<br />");
                })
            })
        });
    }
})