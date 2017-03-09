// Dimension for scatter plot [Total, Tip]
var scatterDimension = payments.dimension(function(d) {
    return [d.total, d.tip];
});

// Scatter group
var scatterGroup = scatterDimension.group();

// define the scatterplot for #paymentScatterPlot
var scatter = dc.scatterPlot("#paymentScatterPlot")
.width(1360)
.height(200)
.dimension(scatterDimension)
.group(scatterGroup)
.symbolSize(20)
.clipPadding(25)
.colorAccessor(function(d) {
    return d.value;
})
.symbol('triangle-down')
.colors(d3.scale.category20b())
.x(d3.scale.linear().domain([0,300]));
