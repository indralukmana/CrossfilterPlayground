// Dimension for scatter plot [Total, Tip]
var scatterDimension = payments.dimension(function(d) {
    return [d.total, d.tip];
});

// Scatter group
var scatterGroup = scatterDimension.group();

// define the bubble chart for #paymentBubbleChart
var bubblechart = dc.bubbleChart("#paymentBubbleChart")
.width(1360)
.height(200)
.margins({top:40, bottom:60, right:80, left:60})
.dimension(scatterDimension)
.group(scatterGroup)
.renderHorizontalGridLines(true)
.renderVerticalGridLines(true)
.clipPadding(75)
.colorAccessor(function(d) {
    return d.value;
})
.colors(d3.scale.category10())
.keyAccessor(function(d) {
  return d.key[0];
})
.valueAccessor(function(d) {
  return d.key[1];
})
.radiusValueAccessor(function(d) {
  return d.value;
})
.maxBubbleRelativeSize(0.05)
.title(function(d) {
  return 'x: ' + d.key[0] + ', y: ' + d.key[1] + ', val: ' + d.value;
})
.yAxisLabel("Tip Size")
.r(d3.scale.linear().domain([1,6]))
.y(d3.scale.linear().domain([0,200]))
.x(d3.scale.linear().domain([0,300]));

bubblechart.yAxis().ticks(5);
