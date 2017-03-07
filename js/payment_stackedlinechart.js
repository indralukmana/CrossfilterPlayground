// Date Dimension
var dateDimension = payments.dimension(function(d) {
    return d.date;
});

// Date group with total
var dateGroup = dateDimension.group().reduceSum(function(d) {
    return d.total;
});

// Date group with tip
var dateGroupTip = dateDimension.group().reduceSum(function(d) {
    return d.tip;
})

// Minimum and maximum value for dateGroup
var minDate = dateDimension.bottom(1)[0].date;
var maxDate = dateDimension.top(1)[0].date;

// define the barchart for #totalchart
var stackedLineChart = dc.lineChart("#stackedLineChart")
.width(1360)
.height(200)
.margins({top: 10, bottom: 30, right: 10, left: 70})
.renderHorizontalGridLines(true)
.renderArea(true)
.dimension(dateDimension)
.group(dateGroup, "Total Spend")
.stack(dateGroupTip, "Tip")
.legend(dc.legend().x(1200).y(5).itemHeight(12).gap(5))
.x(d3.time.scale().domain([minDate,maxDate]))

stackedLineChart.yAxis().ticks(5);
stackedLineChart.xAxis().ticks(4);
