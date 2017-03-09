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
.x(d3.scale.linear().domain([0,300]));
