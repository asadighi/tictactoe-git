///////////////////////////////////////////////////////////
/// MakeRange Filter
//////////////////////////////////////////////////////////
// Use this filter to iterate through a range of numbers in html templates
// e.g. ng-repeat="item in [5, 9] | makeRange" will result in iteration of 5, 6, 7, 8, 9


app.filter('makeRange', function() {
        return function(input) {
            var lowBound, highBound;
            switch (input.length) {
            case 1:
                lowBound = 0;
                highBound = parseInt(input[0]) - 1;
                break;
            case 2:
                lowBound = parseInt(input[0]);
                highBound = parseInt(input[1]);
                break;
            default:
                return input;
            }
            var result = [];
            for (var i = lowBound; i <= highBound; i++)
                result.push(i);
            return result;
        };
    });