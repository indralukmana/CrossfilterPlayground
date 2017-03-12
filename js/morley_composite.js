d3.csv("morley.csv", function(error, experiments) {

    experiments.forEach(function(d) {
        d.Speed = +d.Speed;
        d.Expt = +d.Expt;
        d.Run = +d.Run;
    });

    var facts = crossfilter(experiments);

    var runDimension = facts.dimension(function(d) {
      return [d.Expt, d.Run];
    });

    var runGroup = runDimension.group().reduceSum(function(d) {
      return d.Speed;
    });

    var series = dc.seriesChart("#morleyComposite")
        .width(1360)
        .height(400)
        .margins({
            top: 40,
            bottom: 60,
            right: 80,
            left: 60
        })
        .chart(function(cht) {
          return dc.lineChart(cht).renderArea(true).interpolate('basis');
        })
        .dimension(runDimension)
        .group(runGroup)
        .keyAccessor(function(d) {
          return d.key[1];
        })
        .valueAccessor(function(d) {
          return d.value;
        })
        .seriesAccessor(function(d) {
          return d.key[0]
        })
        .legend(dc.legend().x(100).y(200).itemHeight(13).gap(5).horizontal(2).legendWidth(1360).itemWidth(70))
        .x(d3.scale.linear().domain([1,20]));



        // print_filter(runDimension);
        // print_filter(runGroup);
    // Draw the charts
    dc.renderAll();
})
