$(document).ready(function () {

    var config = {
      apiKey: "AIzaSyBKUq4OsZ2Y6lI_MuL3_EynuM35LNZ98-g",
      authDomain: "sink-timer.firebaseapp.com",
      databaseURL: "https://sink-timer.firebaseio.com",
      storageBucket: "sink-timer.appspot.com",
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    var showerH = [];
    var showerL = [];
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
            var showerEvents = vals["ShowerEvents"];

            var showerHeatIndexes = showerEvents["ShowerHeatIndexes"];
            var showerLengths = showerEvents["ShowerLengths"];

            for(var h in showerHeatIndexes){
                showerH.push(showerHeatIndexes[h]);
            }
            for(var s in showerLengths){
                showerL.push(showerLengths[s]);
            }
        }
        console.log(showerH);
        console.log(showerL);
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
            title: "Weekly Shower Usage",
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
              colors: ['#9adac3','#bad9fc']
          };

         
          var data = google.visualization.arrayToDataTable([
            ['Day', 'Shower Heat', 'Shower Length'],
            ['Monday', showerH[0]*6, showerL[0]],
            ['Tuesday', showerH[1]*6, showerL[1]],
            ['Wednesday', showerH[2]*6, showerL[2]],
            ['Thursday', showerH[3]*6, showerL[3]],
            ['Friday', showerH[4]*6, showerL[4]],
            ['Saturday', showerH[5]*6, showerL[5]],
            ['Sunday', showerH[6]*6, showerL[6]]
          ]);
          chart.draw(data,options)
         
      }
    }


    


});