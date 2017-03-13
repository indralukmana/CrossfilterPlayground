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

      // centering the map
      var centerMap = d3.geo.centroid(statesJson);

      // mercator map projection
      var projectionMercator = d3.geo.mercator().center(centerMap).scale(500).translate([200,100]);


        usChart
            .width(1360)
            .height(500)
            .dimension(states)
            .group(stateRaisedSum)
            .projection(projectionMercator)
            .colors(d3.scale.quantize().range(["#E2F2FF", "#C4E4FF", "#9ED2FF", "#81C5FF", "#6BBAFF", "#51AEFF", "#36A2FF", "#1E96FF", "#0089FF", "#0061B5"]))
            .colorDomain([0, 200])
            .colorCalculator(function(d) {
                return d ? usChart.colors()(d) : "#CCC";
            })
            .overlayGeoJson(statesJson.features, "state", function(d) {
                return d.properties.name;
            });

        dc.renderAll();

    })

})
