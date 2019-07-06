
escript = async (accesstoken, accesstokenidp) => {
    const workOrders = await d3.json("/edroute/workorders");
    const operations = await d3.json("/edroute/operations");
    const plants = await d3.json("/edroute/plants");


    var test1 = [];
     for (var i = 0; i < operations.data.length; i++) {
            test1.push(operations.data[i].plantId);

    }

    const result = test1.reduce((total, value) => {
        total[value] = (total[value] || 0) + 1;
        return total;
   }, {});
   console.log(result);


    // const grafica1ed = workOrders.data.map(it1 => {
    //     it1.name = plants.data.find(it2 => it2._id === it1._id).name
    //     return it1
    //   })

    // var xValueGrafica1Ed = [];
    //  var yValueGrafica1Ed = [];

    //  for (var i = 0; i < grafica1ed.length; i++) {
    //         xValueGrafica1Ed.push(grafica1ed[i].name);
    //         yValueGrafica1Ed.push(grafica1ed[i].count);
    // }

    // var trace1 = {
    //   x: xValueGrafica1Ed,
    //   y: yValueGrafica1Ed,
    //   type: 'bar',
    //   text: yValueGrafica1Ed.map(String),
    //   textposition: 'auto',
    //   hoverinfo: 'none',
    //   marker: {
    //     color: 'rgb(158,202,225)',
    //     opacity: 0.9,
    //     line: {
    //       color: 'rgb(8,48,107)',
    //       width: 1.5
    //     }
    //   }
    // };
    //     var data = [trace1];
    //     var layout = {
    //   title: 'Total Workoders'
    // }; 
    // Plotly.newPlot('eddiv', data, layout);
    // var trace1 = {
    //   x: xValueGrafica1Ed,
    //   y: yValueGrafica1Ed,
    //   type: 'bar',
    //   text: yValueGrafica1Ed.map(String),
    //   textposition: 'auto',
    //   hoverinfo: 'none',
    //   marker: {
    //     color: 'rgb(158,202,225)',
    //     opacity: 0.9,
    //     line: {
    //       color: 'rgb(8,48,107)',
    //       width: 1.5
    //     }
    //   }
    // };
    //     var data = [trace1];
    //     var layout = {
    //   title: 'Total Workoders'
    // }; 
    // Plotly.newPlot('eddiv', data, layout);

    // var trace1 = {
    //     x: xValueGrafica1Ed,
    //     y: yValueGrafica1Ed,
    //     type: 'bar',
    //     text: yValueGrafica1Ed.map(String),
    //     textposition: 'auto',
    //     hoverinfo: 'none',
    //     marker: {
    //       color: 'rgb(158,202,225)',
    //       opacity: 0.9,
    //       line: {
    //         color: 'rgb(8,48,107)',
    //         width: 1.5
    //       }
    //     }
    //   };
    //       var data = [trace1];
    //       var layout = {
    //     title: 'Total Workoders'
    //   }; 
    //   Plotly.newPlot('eddiv1', data, layout);
}

