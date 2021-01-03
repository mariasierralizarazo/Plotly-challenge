function init() {
    var dropdownMenu = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        // Append names in the dropdrown menu
        console.log(data);
        var names = data.names;
        names.forEach((element) => {
            dropdownMenu
                .append("option")
                .text(element)
                .property("value", element)
        });

        //Initialize with a sample
        barChart(names[0]);
        bubbleChart(names[0]);
        panel_data(names[0]);

    })
}

init();
// taken function from Index file
function optionChanged(selected_id)
{
    barChart(selected_id);
    bubbleChart(selected_id);
    panel_data(selected_id);
}

function bubbleChart(selected_id) {
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var samples_filter = samples.filter(x => x.id == selected_id);

        var layout = {
            xaxis: { titles: "OTU ID" },
        };
        var data = [
            {
                x: samples_filter[0].otu_ids,
                y: samples_filter[0].sample_values,
                text: samples_filter[0].otu_labels,
                mode: "markers",
                marker: {
                    size: samples_filter[0].sample_values,
                    color: samples_filter[0].otu_ids,
                }
            }

        ];
        Plotly.newPlot("bubble", data, layout);

    });
}

function barChart(selected_id) {
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var samples_filter = samples.filter(x => x.id == selected_id);

        var otu_id = samples_filter[0].otu_ids;

        var y_data_10 = otu_id.slice(0,10).map(x => `OTU ${x}`).reverse();

        var bardata = [
            {
                y: y_data_10,
                x: samples_filter[0].sample_values.slice(0, 10).reverse(),
                text: samples_filter[0].otu_labels.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h",
            }
        ];

        var layout = {
            title: "Top 10 Bacteria Cultures",
        }
        Plotly.newPlot("bar", bardata, layout);

    });
}

function panel_data(selected_id)
{
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var samples_filter = samples.filter(x => x.id == selected_id);

        // Selecting information place 
        var information = d3.select("#sample-metadata");
        information.html("");

        Object.entries(samples_filter[0]).forEach(([key, value]) => {
            information.append("h5").text(`${key}: ${value}`);
        });
    });

}





  
