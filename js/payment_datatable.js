// Date dimension
var dateDimension = payments.dimension(function(d) {
    return d.date;
});

// Define the table drawing
var paymentDataTable = dc.dataTable("#paymentDataTable")
    .width(1360)
    .height(300)
    .dimension(dateDimension)
    .showGroups(false)
    .size(50)
    .group(function(d) {
        return d.type;
    })
    .columns([{label: 'Time', format: function(d) { return d.date.getHours() +":" + d.date.getMinutes(); }},
              'quantity',
              'total',
              'tip',
              'type'])
    .sortBy(function(d) {
        return d.type;
    })
    .order(d3.ascending)
    .on("renderlet", function(table) {
        table.selectAll('.dc-table-group').classed('info', true);
    });
