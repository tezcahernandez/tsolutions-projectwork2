
escript = async (accesstoken, accesstokenidp) => {
    const workOrders = await d3.json("/edroute/workorders");
    const operations = await d3.json("/edroute/operations");
console.log(workOrders.count)


    //  var dataPoints = [];

    //  var chart = new CanvasJS.Chart("chartContainer", {
    //      animationEnabled: true,
    //      theme: "light2",
    //      title: {
    //          text: "Daily Sales Data"
    //      },
    //      axisY: {
    //          title: "Units",
    //          titleFontSize: 24
    //      },
    //      data: [{
    //          type: "column",
    //          yValueFormatString: "#,### Units",
    //          dataPoints: dataPoints
    //      }]
    //  });

    //  for (var i = 0; i < workOrders.length; i++) {
    //      dataPoints.push({
    //          x: workOrders[i].plantId,
    //          y: workOrders[i].count
    //      });
    //  }
    //  chart.render();

}



