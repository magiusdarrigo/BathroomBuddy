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


    google.charts.setOnLoadCallback(drawBarChart);

    function drawBarChart() {
        var data = google.visualization.arrayToDataTable([
          ['Day', 'Toilet'],
          ['Monday', 1000],
          ['Tuesday', 1170],
          ['Wednesday', 660],
          ['Thursday', 1030],
          ['Friday', 1030],
          ['Saturday', 1030],
          ['Sunday', 1030],
        ]);

        var options = {
          chart: {
            title: 'Weekly Performance',
            subtitle: 'Toilet Usage',
          },
          vAxes: {
                // Adds titles to each axis.
                0: {title: 'Carbon Footprint'}
            },
            colors: ['#B3D9FF']
        };
        var chart = new google.charts.Bar(document.getElementById('columnchart_material'));
        chart.draw(data, google.charts.Bar.convertOptions(options));
    }

});

