// Date Dimension
var dateDimension = payments.dimension(function(d) {
    return d.date;
});

// Date group
var dateGroup = dateDimension.group();

// define the barchart for #totalchart
var totalChart = dc.barChart("#totalChart")
.width(1360)
.height(200)
.dimension(totalDimension)
.group(totalGroup)
.x(d3.scale.linear().domain([0,400]))
.xUnits(dc.units.fp.precision(100));

totalChart.yAxis().ticks(5);
totalChart.xAxis().ticks(4);
