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
        var sample = names[0];
        bubbleChart(sample);



    })
}

init();

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
        Ploty.newPlot("bubble", data, layout);

    });


}








  
