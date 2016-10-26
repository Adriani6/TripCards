app.directive('categorytypetranslator', function(){
        var directive = {};

        directive.restrict = 'E'; /* restrict this directive to elements */

        directive.compile = function(element, attributes) {
            //element.css("border", "1px solid #cccccc");
            console.log(element);

            var linkFunction = function($scope, element, attributes) {
                element.text(Type[$scope.cat]);
            }

            return linkFunction;
        }

        return directive;
    })