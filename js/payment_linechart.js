// Date Dimension
var dateDimension = payments.dimension(function(d) {
    return d.date;
});

// Date group
var dateGroup = dateDimension.group();

// Minimum and maximum value for dateGroup
var minDate = dateDimension.bottom(1)[0].date;
var maxDate = dateDimension.top(1)[0].date;

// define the barchart for #totalchart
var lineChart = dc.lineChart("#lineChart")
.width(1360)
.height(200)
.dimension(dateDimension)
.group(dateGroup)
.x(d3.time.scale().domain([minDate,maxDate]))
.xUnits(dc.units.fp.precision(100));

lineChart.yAxis().ticks(5);
lineChart.xAxis().ticks(4);
