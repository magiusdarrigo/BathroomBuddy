$(document).ready(function () {

    var config = {
      apiKey: "AIzaSyBKUq4OsZ2Y6lI_MuL3_EynuM35LNZ98-g",
      authDomain: "sink-timer.firebaseapp.com",
      databaseURL: "https://sink-timer.firebaseio.com",
      storageBucket: "sink-timer.appspot.com",
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    var light= [];

    var ip = localStorage.getItem("IP");
    var device = localStorage.getItem("Device");
    getSensorVals();



    function getSensorVals() {
        var ref = database.ref("Universe/" + ip +"/"+device);
        ref.once("value", gotData, errData);
    }

    function gotData(data) {
        var dataVal = data.val();

        for(var date in dataVal) {
            var vals = dataVal[date];
            var lightEvents = vals["LightEvents"];
            for(var l in lightEvents){
                light.push(lightEvents[l]);
            }

        }
        console.log(light);
        nextMove();
    }
    function errData(data) {
        console.log("Error!");
    }

    function nextMove() {
      google.charts.load('43', {'packages':['corechart']});


      google.charts.setOnLoadCallback(drawBarChart);

      function drawBarChart() {
         
          var chart = new google.visualization.BarChart(document.getElementById('columnchart_material'));
         
          var options = {
            title: "Weekly Light Usage",

            animation:{
                startup: true,
                duration: 1500,
                easing: 'out',
              },
            vAxes: {
                  // Adds titles to each axis.
                  0: {title: 'Day'},
                  1: {title: 'Environmental Footprint'}
              },
            hAxes: {
                  0: {title: 'Environmental Footprint'}
              },
              colors: ['#f5f382']
          };

         
          var data = google.visualization.arrayToDataTable([
            ['Day', 'Light'],
            ['Monday', light[0]/3],
            ['Tuesday', light[1]/3],
            ['Wednesday', light[2]/3],
            ['Thursday', light[3]/3],
            ['Friday', light[4]/3],
            ['Saturday', light[5]/3],
            ['Sunday', light[6]/3]
          ]);
          chart.draw(data,options)
         
      }
    }


    


});