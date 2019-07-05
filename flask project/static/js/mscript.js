// PROJECT 2
// @version 1.0
// @author Martha Meses 

mscript = async (accesstoken, accesstokenidp) => {

    const unit = await d3.json("/maroute/businessunits");
    var tempmap = {};
    var names2 = [];
    for ( var j = 0; j < unit.data.length; j ++ )
    {
      if (!(unit.data[j].name in tempmap))
      {
        names2.push (
        {
          key: unit.data[j].name,
          values: []
        }
        );
        tempmap[unit.data[j].name] = names2.length - 1;
      }
      names2[tempmap[unit.data[j].name]].values.push ([unit.data[j].id]);    		
    }
    selectUnit(names2);
}
  
function statusWorkOrdersChart(unit) {
  d3.json("/maroute/workorders/"+unit).then((data) => {  
    var xValues = [];
    var yValues = [];
    var trace1 = [];
    for(var i=0; i<data.data.length; i++){
         xValues.push(data.data[i].count);
         yValues.push(data.data[i]._id);
     }

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
  });
}

function selectUnit(names2) {
  // Grab a reference to the dropdown select element
  var selUnit = d3.select("#selUnit");
  for (var i = 0; i < names2.length; i++) {
    var opt = names2[i];
      selUnit
         .append("option")
         .text(opt.key)
         .property("value", opt.values)
    }

  // Use the first sample from the list to build the initial plots
  const firstUnit = names2[0].values;
  statusWorkOrdersChart(firstUnit);
}
  
function optionChanged(newFilter) {
  // Fetch new data each time a new sample is selected
  statusWorkOrdersChart(newFilter);
}