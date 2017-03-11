// Type Dimension
var typeDimension = payments.dimension(function(d) {
    return d.type;
});

// Type group that return object
var typeGroup = typeDimension.group().reduce(reduceAdd, reduceRemove, reduceInitial);

// tipDimension
var tipDimension = payments.dimension(function(d) {
    return d.tip;

});

function reduceAdd(i,d) {
  i[d.quantity] = (i[d.quantity]||0) + d.total;
  return i;
}

function reduceRemove(i,d) {
  i[d.quantity] = (i[d.quantity]||0) - d.total;
  return i;
}

function reduceInitial() {
  return {};
}

// Define the barchart for #chart
dc.barChart("#paymentStackedBarchart")
    .width(1365)
    .height(200)
    .dimension(typeDimension)
    .group(typeGroup, "group1", function(d){ return d.value[1] || 0; })
    .stack(typeGroup, "group2", function(d){ return d.value[2]; })
    .legend(dc.legend().x(1100).y(10).itemHeight(15).gap(5))
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
