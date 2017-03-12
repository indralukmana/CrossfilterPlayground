d3.csv("morley.csv", function(error, experiments) {

    experiments.forEach(function(d) {
        d.Speed = +d.Speed;
        d.Expt = +d.Expt;
        d.Run = +d.Run;
    });

    var facts = crossfilter(experiments);

    var runDimension = facts.dimension(function(d) {
      return [d.Run];
    });

    var runGroup = runDimension.group().reduceSum(function(d) {
      return d.Speed/5;
    });

    var compositeChart = dc.compositeChart("#morleyComposite")
        .width(1360)
        .height(400)
        .margins({
            top: 40,
            bottom: 60,
            right: 80,
            left: 60
        })
        .dimension(runDimension)
        .group(runGroup)
        .x(d3.scale.linear().domain([1,20]));



        // print_filter(runDimension);
        // print_filter(runGroup);
    // Draw the charts
    dc.renderAll();
})
