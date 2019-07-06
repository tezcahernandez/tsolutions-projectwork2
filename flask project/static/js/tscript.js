
const tscript = async (accesstoken, accesstokenidp) => {
    const workOrders = await d3.json("/teroute/workorders");
    const operations = await d3.json("/teroute/operations");
    const operationsByDay = await d3.json("/teroute/operations/weekly");

    debugger;

    // var trace1 = {
    //     x: operationsByDay.map(x => x._id),
    //     y: operationsByDay.map(x => x._id),
    //     type: 'scatter'
    // };

    var data = [
        {
            x: operationsByDay.data.map(x => x._id),
            y: operationsByDay.data.map(x => x.numOfOperations),
            type: 'bar'
        }
    ];

    Plotly.newPlot('tediv', data);

    // var trace2 = {
    //     x: [1, 2, 3, 4],
    //     y: [16, 5, 11, 9],
    //     type: 'scatter'
    // };

    // var data = [trace1/*, trace2*/];

    // Plotly.newPlot('tediv', data);
}