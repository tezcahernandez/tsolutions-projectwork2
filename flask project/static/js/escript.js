
escript = async (accesstoken, accesstokenidp) => {
    const workOrders = await d3.json("/edroute/workorders");
    const operations = await d3.json("/edroute/operations");
    const plants = await d3.json("/edroute/plants");

console.log(plants)
// var result = _.unionBy(workOrders.data, plants.data, "_id");

// console.log(result);


//      var xValue = [];
//      var yValue = [];

//      for (var i = 0; i < workOrders.data.length; i++) {
//             xValue.push(workOrders.data[i]._id);
//             yValue.push(workOrders.data[i].count);
//     }
   
//     var trace1 = {
//       x: xValue,
//       y: yValue,
//       type: 'bar',
//       text: yValue.map(String),
//       textposition: 'auto',
//       hoverinfo: 'none',
//       marker: {
//         color: 'rgb(158,202,225)',
//         opacity: 0.6,
//         line: {
//           color: 'rgb(8,48,107)',
//           width: 1.5
//         }
//       }
//     };
    
//     var data = [trace1];
    
//     var layout = {
//       title: 'January 2013 Sales Report'
//     };
    
//     Plotly.newPlot('eddiv', data, layout);
        
    
// }


}
