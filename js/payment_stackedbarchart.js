// Type Dimension
var typeDimension = payments.dimension(function(d) {
    return d.type;
});

// Type group with Total from typeDimension
var typeGroup = typeDimension.group().reduceSum(function (d) {
    return d.total;
});

// tipDimension
var tipDimension = payments.dimension(function(d) {
    return d.tip;
});

// Define the barchart for #chart
dc.barChart("#paymentStackedBarchart")
    .width(1365)
    .height(200)
    .dimension(typeDimension)
    .group(typeGroup)
    .x(d3.scale.ordinal().domain(['visa', 'cash', 'tab']))
    .xUnits(dc.units.ordinal)
    .barPadding(0.2)
    .outerPadding(0)
    .yAxis().ticks(5);

// Total dimension
var totalDimension = payments.dimension(function(d) {
  return d.total;
});

// Total group
var totalGroup = totalDimension.group(function (d) {
    return Math.floor(d/100)*100;
});

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
