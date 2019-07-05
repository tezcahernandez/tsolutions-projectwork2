
escript = async (accesstoken, accesstokenidp) => {
    const workOrders = await d3.json("/edroute/workorders");
    const operations = await d3.json("/edroute/operations");
    const plants = await d3.json("/edroute/plants");
    console.log(workOrders)
    console.log(plants)


    const grafica1ed = workOrders.data.map(it1 => {
        it1.name = plants.data.find(it2 => it2._id === it1._id).name
        return it1
      })

//    var grafica1ed = _.map(workOrders.data, function(itemed) {
//       return _.assign(itemed, _.find(plants.data, ['_id', itemed._id]));
//   });

    var xValueGrafica1Ed = [];
     var yValueGrafica1Ed = [];

     for (var i = 0; i < grafica1ed.length; i++) {
            xValueGrafica1Ed.push(grafica1ed[i].name);
            yValueGrafica1Ed.push(grafica1ed[i].count);
    }
console.log(grafica1ed)
console.log(xValueGrafica1Ed)
console.log(yValueGrafica1Ed)

    var trace1 = {
      x: xValueGrafica1Ed,
      y: yValueGrafica1Ed,
      type: 'bar',
      text: yValueGrafica1Ed.map(String),
      textposition: 'auto',
      hoverinfo: 'none',
      marker: {
        color: 'rgb(158,202,225)',
        opacity: 0.6,
        line: {
          color: 'rgb(8,48,107)',
          width: 1.5
        }
      }
    };
    
    var data = [trace1];
    
    var layout = {
      title: 'Total Workoders'
    };
    
    Plotly.newPlot('eddiv', data, layout);
        
    
}

