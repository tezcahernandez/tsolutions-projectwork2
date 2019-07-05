
mscript = async (accesstoken, accesstokenidp) => {
    // const workOrders = await d3.json("/maroute/workorders");
    // const operations = await d3.json("/maroute/operations");

    const data = await d3.json("/maroute/workorders");
    var xValues = [];
    var yValues = [];
    for(var i=0; i<data.data.length; i++){
        xValues.push(data.data[i].count);
        yValues.push(data.data[i]._id);
    }

    statusWorkOrdersChart(xValues,yValues);
}

function statusWorkOrdersChart(xValues,yValues) {
    var trace1={
    // labels: ['NEW','APPROVED','CLOSED','UPDATED','SUSPENDED','PRIORITY'],
        labels: yValues,
        values: xValues, 
        type:'pie'
    };
    var dataT=[trace1];
    var layout = {
        // title:'PIE',
        height: 400,
        width: 400
      };
    Plotly.newPlot('madiv',dataT,layout);
};
