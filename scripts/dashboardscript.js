$(document).ready(function () {

   var config = {
      apiKey: "AIzaSyBKUq4OsZ2Y6lI_MuL3_EynuM35LNZ98-g",
      authDomain: "sink-timer.firebaseapp.com",
      databaseURL: "https://sink-timer.firebaseio.com",
      storageBucket: "sink-timer.appspot.com",
    };

    firebase.initializeApp(config);

    var database = firebase.database();



    google.charts.load('current', {'packages':['bar','line','gauge']});

    am4core.ready(function() {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // create chart
        var chart = am4core.create("gauge", am4charts.GaugeChart);
        chart.innerRadius = -15;

        var axis = chart.xAxes.push(new am4charts.ValueAxis());
        axis.min = 0;
        axis.max = 100;
        axis.strictMinMax = true;

        var colorSet = new am4core.ColorSet();

        var range1 = axis.axisRanges.create();
        range1.value = 0;
        range1.endValue = 25;
        range1.axisFill.fillOpacity = 1;
        range1.axisFill.fill = am4core.color("#ff6961");
        range1.axisFill.zIndex = -1;
        var range2 = axis.axisRanges.create();
        range2.value = 25;
        range2.endValue = 80;
        range2.axisFill.fillOpacity = 1;
        range2.axisFill.fill = am4core.color("#FEFE69");
        range2.axisFill.zIndex = -1;
        var range3 = axis.axisRanges.create();
        range3.value = 80;
        range3.endValue = 100;
        range3.axisFill.fillOpacity = 1;
        range3.axisFill.fill = am4core.color("#A9F36A");
        range3.axisFill.zIndex = -1;

        var gradient = new am4core.LinearGradient();
        // gradient.stops.push({color:am4core.color("red")})
        // gradient.stops.push({color:am4core.color("yellow")})
        // gradient.stops.push({color:am4core.color("green")})

        axis.renderer.line.stroke = gradient;
        axis.renderer.line.strokeWidth = 15;
        axis.renderer.line.strokeOpacity = 1;

        axis.renderer.grid.template.disabled = true;

        var hand = chart.hands.push(new am4charts.ClockHand());
        hand.radius = am4core.percent(97);

        setInterval(function() {
            hand.showValue(100, 1000, am4core.ease.cubicOut);
        }, 2000);


    }); 

    // $('#gauge').gauge({
    //   values: {
    //     0 : '0',
    //     20: '20',
    //     40: '40',
    //     60: '60',
    //     80: '80',
    //     100: '100'
    //   },
    //   colors: {
    //     0 : '#ff6961',
    //     25: '#FEFE69',
    //     80: '#A9F36A'
    //   },
    //   angles: [
    //     180,
    //     360
    //   ],
    //   lineWidth: 10,
    //   arrowWidth: 20,
    //   arrowColor: '#ccc',
    //   inset:true,

    //   value: 30
    // });


    // var data = [
    // {
    //     type: "indicator",
    //     mode: "gauge+number",
    //     value: 45,
    //     title: { text: "Environment Score", font: { size: 24 } },
    //     // delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
    //     gauge: {
    //       axis: { range: [null, 100], tickwidth: 1, tickcolor: "004A9D" },
    //       bar: { color: "88BBE4" },
    //       bgcolor: "white",
    //       borderwidth: 2,
    //       bordercolor: "gray",
    //       steps: [
    //         { range: [0, 15], color: "ff6961" },
    //         { range: [15, 40], color: "FEFE69" },
    //         { range: [40, 100], color: "A9F36A" }
    //       ]
    //     }
    //   }
    // ];

    // var layout = {
    //   width: 940,
    //   height: 540,
    //   // margin: { t: 25, r: 25, l: 25, b: 25 },
    //   paper_bgcolor: "lavendar",
    //   font: { color: "004A9D", family: "Arial" }
    // };

    // Plotly.newPlot('gauge', data, layout);


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
          ['Monday', 1000, 400, 200], //0,012
          ['Tuesday', 1170, 460, 250],
          ['Wednesday', 660, 1120, 300],
          ['Thursday', 1030, 540, 350],
          ['Friday', 1030, 540, 350],
          ['Saturday', 1030, 540, 350],
          ['Sunday', 1030, 540, 350], //6,012
        ]);

        var dumbieData = google.visualization.arrayToDataTable([
          ['Day', 'Shower', 'Toilet', 'Light'],
          ['Monday', 1000, 400, 200],
          ['Tuesday', 0, 0, 0],
          ['Wednesday', 0, 0, 0],
          ['Thursday', 0, 0, 0],
          ['Friday', 0, 0, 0],
          ['Saturday', 0, 0, 0],
          ['Sunday', 0, 0, 0],
          ]);

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

     
      var index = 1;
      setInterval(function(){
       
        if(dumbieData.getValue(index,1) < data.getValue(index, 1)){
          dumbieData.setValue(index,1, dumbieData.getValue(index,1)+(data.getValue(index,1)/6));
        }
        if(dumbieData.getValue(index,2) < data.getValue(index, 2)){
          dumbieData.setValue(index,2, dumbieData.getValue(index,2)+(data.getValue(index,2)/6));
        }
        if(dumbieData.getValue(index,3) < data.getValue(index, 3)){
          dumbieData.setValue(index,3, dumbieData.getValue(index,3)+(data.getValue(index,3)/6));
        }
        if(dumbieData.getValue(index,1)>=data.getValue(index,1) && dumbieData.getValue(index,2)>=data.getValue(index,2) && dumbieData.getValue(index,3)>=data.getValue(index,3))
        {
          index++;
        }
        // console.log(data.getValue(6,1));
        // console.log(data.getValue(6,2));
        // console.log(data.getValue(6,3));


        chart.draw(dumbieData, google.charts.Line.convertOptions(options));

      }, 30);
    }

});

