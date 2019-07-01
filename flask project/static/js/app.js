buildGauge = (WFREQ) => {
    var level = WFREQ;

    var degrees = 9 - level,
        radius = .5;
    var radians = degrees * Math.PI / 9;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    var path = mainPath.concat(pathX, space, pathY, pathEnd);

    var data = [{
        type: 'scatter',
        x: [0], y: [0],
        marker: { size: 28, color: '850000' },
        showlegend: false,
        name: 'speed',
        text: level,
        hoverinfo: 'text+name'
    },
    {
        values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
        rotation: 90,
        text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
        textinfo: 'text',
        textposition: 'inside',
        marker: {
            // colors: ['#0A2F51', '#0E4D64', '#137177', '#188977', '#1D9A6C', '#48B16D', '#74C67A', '#ADDAA1', '#DEEDCF', '#fff'],
            colors: ['#00429d', '#2e59a8', '#4771b2', '#5d8abd', '#73a2c6', '#8abccf', '#a5d5d8', '#c5eddf', '#ffffe0', "fff"]

        },
        labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
        hoverinfo: 'label',
        hole: .5,
        type: 'pie',
        showlegend: false
    }];

    var layout = {
        shapes: [{
            type: 'path',
            path: path,
            fillcolor: '850000',
            line: {
                color: '850000'
            }
        }],
        title: '<b>Belly Button Washing Frequency</b>'
            + '<br>Scrubs per Week',
        height: 600,
        width: 600,
        xaxis: {
            zeroline: false, showticklabels: false,
            showgrid: false, range: [-1, 1]
        },
        yaxis: {
            zeroline: false, showticklabels: false,
            showgrid: false, range: [-1, 1]
        }
    };

    Plotly.newPlot('gauge', data, layout);
    let gaugeRef = d3.select("#gauge > .plot-container.plotly > .svg-container");
    gaugeRef.style("height", "300px");
}
buildMetadata = async (sample) => {
    let urlMetadata = `/metadata/${sample}`;
    let sampleData = await d3.json(urlMetadata);

    let sampleMetadata = d3.select("#sample-metadata");
    sampleMetadata.html("");


    Object.entries(sampleData).forEach(function ([key, value]) {
        row = sampleMetadata.append("div");
        row.classed("xd", true);
        row.append("h4").html(`<strong>${key}</strong>`);
        row.append("h4").html(`${value}`);
    });

    buildGauge(sampleData.WFREQ == null ? 0 : sampleData.WFREQ);
}

buildCharts = async (sample) => {

    var urlSamples = `/samples/${sample}`;
    let data = await d3.json(urlSamples);

    const bubbleTrace = [{
        x: data.otu_ids,
        y: data.sample_values,
        text: data.otu_labels,
        mode: 'markers',
        marker: {
            color: data.otu_ids,
            size: data.sample_values
        }
    }];

    const bubbleLayout = {
        xaxis: { title: "OTU ID" },
    };

    Plotly.newPlot('bubble', bubbleTrace, bubbleLayout);

    pieTrace = [{
        values: data.sample_values.slice(0, 10),
        labels: data.otu_ids.slice(0, 10),
        hovertext: data.otu_labels.slice(0, 10),
        type: 'pie'
    }];

    Plotly.newPlot('pie', pieTrace);

    let gaugeRef = d3.select("#pie > .plot-container.plotly > .svg-container");
    gaugeRef.style("height", "380px");
}

authenticationInit = () => {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    d3.json("/names").then((sampleNames) => {
        sampleNames.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });

        // Use the first sample from the list to build the initial plots
        const firstSample = sampleNames[0];
        buildCharts(firstSample);
        buildMetadata(firstSample);
    });
}

// function optionChanged(newSample) {
//     // Fetch new data each time a new sample is selected
//     buildCharts(newSample);
//     buildMetadata(newSample);
// }

// Initialize the dashboard
authenticationInit();
