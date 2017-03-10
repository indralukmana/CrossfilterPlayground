// Date dimension
var dateDimension = payments.dimension(function(d) {
    return d.date;
});

// Define the table drawing
var paymentDataTable = dc.dataTable("#paymentDataTable")
    .width(1360)
    .height(300)
    .dimension(dateDimension)
    .group(function(d) {
        return d;
    })
    .columns(['date','quantity','total','tip','type']);
