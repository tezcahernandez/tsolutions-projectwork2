
escript = async (accesstoken, accesstokenidp) => {
    const workOrders = await d3.json("/edroute/workorders");
    const operations = await d3.json("/edroute/operations");

     var dataPoints = [];

     for (var i = 0; i < workOrders.data.length; i++) {
        dataPoints.push({
            x: workOrders.data[i]._id,
            y: workOrders.data[i].count
        });
    }
    console.log(dataPoints)

    
        var chart = new CanvasJS.Chart("eddiv", {
            animationEnabled: true,
            theme: "light2", // "light1", "light2", "dark1", "dark2"
            title: {
                text: "GDP Growth Rate - 2016"
            },
            axisY: {
                title: "Growth Rate (in %)",
                suffix: "%",
                includeZero: false
            },
            axisX: {
                title: "Countries"
            },
            data: [{
                type: "column",
                dataPoints: dataPoints
                    
            }]
        });
        chart.render();
        
    
}



