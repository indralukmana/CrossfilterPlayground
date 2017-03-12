d3.csv("morley.csv", function(error, experiments) {

    experiments.forEach(function(d) {
        d.Speed = +d.Speed;
        d.Expt = +d.Expt;
        d.Run = +d.Run;
    });

    var facts = crossfilter(experiments);

    var experimentsDimension = facts.dimension(function(d) {
        return 'Expt ' + d.Expt;
    });

    var speedArrayGroup = experimentsDimension.group().reduce(
        function(i, d) {
            i.push(d.Speed);
            return i;
        },
        function(i, d) {
            i.splice(i.indexOf(d.Speed), 1);
            return i;
        },
        function(i, d) {
            return [];
        }
    );

    var boxPlot = dc.boxPlot("#morleyBoxplot")
        .width(1360)
        .height(400)
        .margins({
            top: 40,
            bottom: 60,
            right: 80,
            left: 60
        })
        .dimension(experimentsDimension)
        .group(speedArrayGroup);

    // Draw the charts
    dc.renderAll();
})
