$(document).ready(function () {

    var config = {
        "apiKey" : "AIzaSyCm6oWzvhDOi3szra2UQja7wm19K1lsb",
        "authDomain": "americanairlines-f737a.firebaseapp.com",
        "databaseURL": "https://americanairlines-f737a.firebaseio.com/",
        "storageBucket": "americanairlines-f737a.appspot.com"
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
            subtitle: 'Shower Usage',
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
            colors: ['#B3D9FF']
        };

       
        var data = google.visualization.arrayToDataTable([
          ['Day', 'Shower'],
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