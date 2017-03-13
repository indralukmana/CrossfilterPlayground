var usChart = dc.geoChoroplethChart("#map");

d3.csv("vc.csv", function(error, vcData) {


    // change the data type of Raised from string to number
    vcData.forEach(function(d) {
        d.Raised = +d.Raised;
    });

    var vcFacts = crossfilter(vcData);

    // create the states dimension
    var states = vcFacts.dimension(function(d) {
        return d.State;
    });

    // create the sum for raised group by states
    var stateRaisedSum = states.group().reduceSum(function(d) {
        return d.Raised;
    })
})
