
escript = async (accesstoken, accesstokenidp) => {
    const data = await d3.json("/api/eroute/workorders");

    var dataPoints = [];

    var chart = new CanvasJS.Chart("chartContainer", {
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

    for (var i = 0; i < data.length; i++) {
        dataPoints.push({
            x: data[i].plantId,
            y: data[i].y
        });
    }
    chart.render();

}



