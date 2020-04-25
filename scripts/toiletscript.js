$(document).ready(function () {

    var config = {
      apiKey: "AIzaSyBKUq4OsZ2Y6lI_MuL3_EynuM35LNZ98-g",
      authDomain: "sink-timer.firebaseapp.com",
      databaseURL: "https://sink-timer.firebaseio.com",
      storageBucket: "sink-timer.appspot.com",
    };

    firebase.initializeApp(config);

    var database = firebase.database();



    google.charts.load('43', {'packages':['corechart']});


    google.charts.setOnLoadCallback(drawBarChart);

    function drawBarChart() {
       
        var chart = new google.visualization.BarChart(document.getElementById('columnchart_material'));
       
        var options = {
          chart: {
            title: 'Weekly Performance',
            subtitle: 'Toilet Usage',
          },
          animation:{
              startup: true,
              duration: 1500,
              easing: 'out',
            },
          vAxes: {
                // Adds titles to each axis.
                0: {title: 'Day'},
                1: {title: 'Carbon Footprint'}
            },
          hAxes: {
                0: {title: 'Carbon Footprint'}
            },
            colors: ['#B3D9FF']
        };

       
        var data = google.visualization.arrayToDataTable([
          ['Day', 'Toilet'],
          ['Monday', 1000],
          ['Tuesday', 1170],
          ['Wednesday', 660],
          ['Thursday', 1030],
          ['Friday', 1030],
          ['Saturday', 1030],
          ['Sunday', 1030]
        ]);
        chart.draw(data,options)
       
    }

});

