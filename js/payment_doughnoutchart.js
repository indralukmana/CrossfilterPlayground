// Type Dimension
var typeDimension = payments.dimension(function(d) {
    return d.type;
});

// Type group with Total from typeDimension
var typeGroup = typeDimension.group().reduceSum(function (d) {
    return d.total;
});

// Define the piechart for #paymentPieChart
dc.pieChart("#paymentDoughnoutChart")
    .width(1365)
    .height(200)
    .dimension(typeDimension)
    .group(typeGroup)
    .title(function(d) {
        return d.key + ': £' + d.value;
    })
    .renderLabel(false)
    .radius(100)
    .innerRadius(80)
    .legend(dc.legend().x(1200).y(5).itemHeight(12).gap(5))
    .colors(d3.scale.category10())
    .transitionDuration(1500);
