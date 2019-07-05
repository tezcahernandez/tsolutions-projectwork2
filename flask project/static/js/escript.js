
escript = async (accesstoken, accesstokenidp) => {
    const workOrders = await d3.json("/edroute/workorders");
    const operations = await d3.json("/edroute/operations");
    const plants = await d3.json("/edroute/plants");

var grafica1 = _.map(workOrders.data, function(item) {
    return _.assign(item, _.find(plants.data, ['_id', item._id]));
});


    var xValue = [];
     var yValue = [];

     for (var i = 0; i < grafica1.length; i++) {
            xValue.push(grafica1[i].name);
            yValue.push(grafica1[i].count);
    }
   
console.log(xValue)
console.log(yValue)

    var trace1 = {
      x: xValue,
      y: yValue,
      type: 'bar',
      text: yValue.map(String),
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

