// Type Dimension
var typeDimension = payments.dimension(function(d) {
    return d.type;
});

// Type group with Total from typeDimension
var typeGroup = typeDimension.group().reduceSum(function (d) {
    return d.total;
});

// Define the piechart for #paymentPieChart
dc.pieChart("#paymentPieChart")
    .width(1365)
    .height(200)
    .dimension(typeDimension)
    .group(typeGroup)
    .title(function(d) {
        return d.key + ': £' + d.value;
    })
    .label(function(d) {
        return d.key + ': ' + Math.round((d.value)/sumTotal*100) + '%';
    });
