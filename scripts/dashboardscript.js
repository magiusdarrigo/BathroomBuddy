$(document).ready(function () {

    var config = {
        "apiKey" : "AIzaSyCm6oWzvhDOi3szra2UQja7wm19K1lsb",
        "authDomain": "americanairlines-f737a.firebaseapp.com",
        "databaseURL": "https://americanairlines-f737a.firebaseio.com/",
        "storageBucket": "americanairlines-f737a.appspot.com"
    };

    firebase.initializeApp(config);

    var database = firebase.database();



    google.charts.load('current', {'packages':['bar','line','gauge']});

    var data = [
    {
        type: "indicator",
        mode: "gauge+number",
        value: 45,
        title: { text: "Environment Score", font: { size: 24 } },
        // delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
        gauge: {
          axis: { range: [null, 100], tickwidth: 1, tickcolor: "004A9D" },
          bar: { color: "88BBE4" },
          bgcolor: "white",
          borderwidth: 2,
          bordercolor: "gray",
          steps: [
            { range: [0, 15], color: "ff6961" },
            { range: [15, 40], color: "FEFE69" },
            { range: [40, 100], color: "A9F36A" }
          ]
        }
      }
    ];

    var layout = {
      width: 940,
      height: 540,
      // margin: { t: 25, r: 25, l: 25, b: 25 },
      paper_bgcolor: "lavendar",
      font: { color: "004A9D", family: "Arial" }
    };

    Plotly.newPlot('gauge', data, layout);


    // google.charts.setOnLoadCallback(drawGauge);

    // function drawGauge() {

    //     var data = google.visualization.arrayToDataTable([
    //       ['Label', 'Value'],
    //       ['ES', 80]
    //     ]);

    //     var options = {
    //       width: 800, height: 600,
    //       redFrom: 90, redTo: 100,
    //       yellowFrom:75, yellowTo: 90,
    //       greenFrom:0, greenTo: 75
    //     };

    //     var chart = new google.visualization.Gauge(document.getElementById('chart_div'));

    //     chart.draw(data, options);

        // setInterval(function() {
        //   data.setValue(0, 1, 40 + Math.round(60 * Math.random()));
        //   chart.draw(data, options);
        // }, 13000);
        // setInterval(function() {
        //   data.setValue(1, 1, 40 + Math.round(60 * Math.random()));
        //   chart.draw(data, options);
        // }, 5000);
        // setInterval(function() {
        //   data.setValue(2, 1, 60 + Math.round(20 * Math.random()));
        //   chart.draw(data, options);
        // }, 26000);
    // }


    google.charts.setOnLoadCallback(drawBarChart);

    function drawBarChart() {
        var data = google.visualization.arrayToDataTable([
          ['Day', 'Shower', 'Toilet', 'Light'],
          ['Monday', 1000, 400, 200],
          ['Tuesday', 1170, 460, 250],
          ['Wednesday', 660, 1120, 300],
          ['Thursday', 1030, 540, 350],
          ['Friday', 1030, 540, 350],
          ['Saturday', 1030, 540, 350],
          ['Sunday', 1030, 540, 350],
        ]);

        var options = {
          chart: {
            title: 'Weekly Performance',
            subtitle: 'Shower, Light, and Toilet Usage',
          },
          vAxes: {
                // Adds titles to each axis.
                0: {title: 'Carbon Footprint'}
            },
            colors: ['#B3D9FF','#87DCC0', '#88BBE4']
        };
        var chart = new google.charts.Bar(document.getElementById('columnchart_material'));
        chart.draw(data, google.charts.Bar.convertOptions(options));
    }

    google.charts.setOnLoadCallback(drawLineChart);

    function drawLineChart() {

        var data = google.visualization.arrayToDataTable([
          ['Day', 'Shower', 'Toilet', 'Light'],
          ['Monday', 1000, 400, 200],
          ['Tuesday', 1170, 460, 250],
          ['Wednesday', 660, 1120, 300],
          ['Thursday', 1030, 540, 350],
          ['Friday', 1030, 540, 350],
          ['Saturday', 1030, 540, 350],
          ['Sunday', 1030, 540, 350],
        ]);

      // var data = new google.visualization.DataTable();
      // data.addColumn('word', 'Day');
      // data.addColumn('number', 'Shower');
      // data.addColumn('number', 'Lights');
      // data.addColumn('number', 'Toilet');

      // data.addRows([
      //   ['Monday',  37.8, 80.8, 41.8],
      //   ['Monday',  30.9, 69.5, 32.4],
      //   ['Monday',  25.4,   57, 25.7]
        // [4,  11.7, 18.8, 10.5],
        // [5,  11.9, 17.6, 10.4],
        // [6,   8.8, 13.6,  7.7],
        // [7,   7.6, 12.3,  9.6],
        // [8,  12.3, 29.2, 10.6],
        // [9,  16.9, 42.9, 14.8],
        // [10, 12.8, 30.9, 11.6],
        // [11,  5.3,  7.9,  4.7],
        // [12,  6.6,  8.4,  5.2],
        // [13,  4.8,  6.3,  3.6],
        // [14,  4.2,  6.2,  3.4]
      // ]);

      var options = {
        chart: {
          title: 'Weekly Performance',
          subtitle: 'Shower, Lights, and Toilet Usage'
        },
        vAxes: {
            // Adds titles to each axis.
            0: {title: 'Carbon Footprint'}
        },
        width: 900,
        height: 500,
        colors: ['#87DCC0','#B3D9FF', '#88BBE4']
      };

      var chart = new google.charts.Line(document.getElementById('linechart_material'));

      chart.draw(data, google.charts.Line.convertOptions(options));
    }

});

