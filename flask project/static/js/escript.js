
escript = async (accesstoken, accesstokenidp) => {
    const workOrders = await d3.json("/edroute/workorders");
    const operations = await d3.json("/edroute/operations");

     var dataPoints = [];

     var chart = new CanvasJS.Chart("eddiv", {
         animationEnabled: true,
         theme: "light2",
         title: {
             text: "Daily Sales Data"
         },
         axisY: {
             title: "Units",
             titleFontSize: 24
         },
         data: [{
             type: "column",
             yValueFormatString: "#,### Units",
             dataPoints: dataPoints
         }]
     });

     for (var i = 0; i < workOrders.workOrders.length; i++) {
         dataPoints.push({
             x: workOrders.workOrders[i].plantId,
             y: workOrders.workOrders[i].count
         });
     }
     chart.render();

}



