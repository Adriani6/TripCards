var Basket =
{
    init : function($scope)
    {
        $scope.basketAttractions = selected_attractions;
    },

    Toggle : function($scope)
    {
        this.init($scope);
        
        var targetMain = angular.element(document.querySelector("#mainScreen"))[0].style.display;
        var targetBasket = angular.element(document.querySelector("#basket"))[0].style.display;

        console.log(targetMain, targetBasket);
        if(targetBasket == "none")
        {
            angular.element(document.querySelector("#mainScreen"))[0].style.display = "none";
            angular.element(document.querySelector("#basket"))[0].style.display = "inline-block";
            
        }
        else
        {
            angular.element(document.querySelector("#mainScreen"))[0].style.display = "inline-block";
            angular.element(document.querySelector("#basket"))[0].style.display = "none";
        } 
    } 
}