var usChart = dc.geoChoroplethChart("#vcChoropleth");

d3.csv("vc.csv", function(errorVC, vcData) {


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

    d3.json("us-states.json", function(errorJson, statesJson) {

        usChart
            .width(1360)
            .height(500)
            .dimension(states)
            .group(stateRaisedSum)
            .overlayGeoJson(statesJson.features, "state", function(d) {
                return d.properties.name;
            });

        dc.renderAll();

    })

})
