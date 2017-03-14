// Date Dimension
var dateDimension = payments.dimension(function(d) {
    return d.date;
});

// Date group
var dateGroup = dateDimension.group().reduceSum(function(d) {
    return d.total;
});

// Volume group
var volGroup = dateDimension.group();

// Minimum and maximum value for dateGroup
var minDate = dateDimension.bottom(1)[0].date;
var maxDate = dateDimension.top(1)[0].date;

var volGroup = dc.barChart("#rangeChart");

volgroup
  .height(70)
  .width(1360)
  .margins({top: 10, bottom: 30, right: 10, left: 70})

  .dimension(dateDimension)
  .group(volGroup)
  .x(d3.time.scale().domain([minDate,maxDate]))

// define the barchart for #totalchart
// var lineChart = dc.lineChart("#rangeChart")
// .width(1360)
// .height(200)
// .margins({top: 10, bottom: 30, right: 10, left: 70})
// .renderHorizontalGridLines(true)
// .renderArea(true)
// .dimension(dateDimension)
// .group(dateGroup)
// .x(d3.time.scale().domain([minDate,maxDate]))
//
// lineChart.yAxis().ticks(5);
// lineChart.xAxis().ticks(4);
