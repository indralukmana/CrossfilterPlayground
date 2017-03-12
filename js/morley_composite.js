d3.csv("morley.csv", function(error, experiments) {

    // define the chart parent
    var compositeChart = dc.compositeChart("#morleyComposite");

    experiments.forEach(function(d) {
        d.Speed = +d.Speed;
        d.Expt = +d.Expt;
        d.Run = +d.Run;
    });

    var facts = crossfilter(experiments);

    // first dimension for the linechart
    var runDimension = facts.dimension(function(d) {
        return [d.Run];
    });

    // grouping for average speed
    var speedGroup = runDimension.group().reduceSum(function(d) {
        return d.Speed / 5;
    });

    // dimension for each data
    var scatterDimension = facts.dimension(function(d) {
        return [d.Run, d.Expt];
    });

    // the value of speed
    var scatterGroup = scatterDimension.group().reduceSum(function(d) {
        return d.Speed;
    });


    // modify the chart
    compositeChart
        .width(1360)
        .height(400)
        .margins({
            top: 40,
            bottom: 60,
            right: 80,
            left: 60
        })
        .clipPadding(10)
        .x(d3.scale.linear().domain([1, 20]))
        .compose([
            dc.scatterPlot(compositeChart)
            .group(scatterGroup)
            .dimension(scatterDimension)
            .keyAccessor(function(d) {
                return d.key[0];
            })
            .valueAccessor(function(d) {
                return d.value;
            })
            .colors("pink")
            .symbolSize(5),
            dc.lineChart(compositeChart)
            .group(speedGroup)
            .dimension(runDimension)

        ]);

    dc.renderAll();
})
