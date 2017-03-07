// Date Dimension
var dateDimension = payments.dimension(function(d) {
    return d.date;
});

// Date group
var dateGroup = dateDimension.group();

// define the barchart for #totalchart
var lineChart = dc.lineChart("#lineChart")
.width(1360)
.height(200)
.dimension(dateDimension)
.group(dateGroup)
.x(d3.scale.linear().domain([0,400]))
.xUnits(dc.units.fp.precision(100));

lineChart.yAxis().ticks(5);
lineChart.xAxis().ticks(4);
