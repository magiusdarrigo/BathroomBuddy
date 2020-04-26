$(document).ready(function () {

   var config = {
      apiKey: "AIzaSyBKUq4OsZ2Y6lI_MuL3_EynuM35LNZ98-g",
      authDomain: "sink-timer.firebaseapp.com",
      databaseURL: "https://sink-timer.firebaseio.com",
      storageBucket: "sink-timer.appspot.com",
    };

    firebase.initializeApp(config);
    var database = firebase.database();

    var light = [];
    var showerH = [];
    var showerL = [];

    var rewards = localStorage.getItem("Rewards");
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

            var lightEvents = vals["LightEvents"];
            var showerHeatIndexes = showerEvents["ShowerHeatIndexes"];
            var showerLengths = showerEvents["ShowerLengths"];

            for(var l in lightEvents){
                light.push(lightEvents[l]);
            }
            for(var h in showerHeatIndexes){
                showerH.push(showerHeatIndexes[h]);
            }
            for(var s in showerLengths){
                showerL.push(showerLengths[s]);
            }
        }

        console.log(light);
        console.log(showerH);
        console.log(showerL);
        nextMove();
        
    }

    function errData(data) {
        console.log("Error!");
    }

     function average(data) {
        var count = 0;
        var sum = 0;
        for(var i in data) {
            sum += data[i];
            count++;
        }
        return sum/count;

    }

    function calcScore(){
        var avgH = average(showerH);
        var avgS = average(showerL);
        var avgL = average(light);
        var score = 100 - 40 * (avgS/180 * 0.2) - 20 * (avgH/90 * 0.2) - 5 * (avgL/1000 * 0.2);
        $("#gaugescore").html(Math.round(score));
        calcBill(score);
        calcRewards(score);
        console.log(score);
        return score;
    }

    function calcBill(score) {

        var energyBill = 70/score * 112.67;
        var waterBill = 70/score * 70.39;

        $("#energy").html("$"+energyBill.toFixed(2));
        $("#water").html("$"+waterBill.toFixed(2));
        $("#energyd").html("+2.5%");
        $("#waterd").html("+4.5%");

    }

    function calcRewards(score) {
        var reward = Math.round(score * 7);
        localStorage.setItem("Rewards", reward);
        rewards = reward

        var user = localStorage.getItem("customer");
        var device = localStorage.getItem("Device");
        var ip = localStorage.getItem("IP");
        var name = localStorage.getItem("FirstName");
        var ref = database.ref("Users/"+user);
        ref.set({
          Device: device,
          IP: ip,
          Name: name,
          Rewards: reward,
        });
    }



    var rewards = localStorage.getItem("Rewards");
    $("#pointslabel").html("Rewards Points: "+rewards);

    if(rewards > 2500) {
        $("#mathlabel").html("Congrats! You may claim a prize!");
    }
    else {
        $("#mathlabel").html((2500-rewards) +" more points until your next prize!");
    }

    google.charts.load('current', {'packages':['bar','line','gauge', 'corechart']});

    function nextMove(){
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
            range1.axisFill.fill = am4core.color("#bad9fc");
            range1.axisFill.zIndex = -1;
            var range2 = axis.axisRanges.create();
            range2.value = 25;
            range2.endValue = 80;
            range2.axisFill.fillOpacity = 1;
            range2.axisFill.fill = am4core.color("#92bce0");
            range2.axisFill.zIndex = -1;
            var range3 = axis.axisRanges.create();
            range3.value = 80;
            range3.endValue = 100;
            range3.axisFill.fillOpacity = 1;
            range3.axisFill.fill = am4core.color("#9adac3");
            range3.axisFill.zIndex = -1;

            var gradient = new am4core.LinearGradient();

            axis.renderer.line.stroke = gradient;
            axis.renderer.line.strokeWidth = 15;
            axis.renderer.line.strokeOpacity = 1;

            axis.renderer.grid.template.disabled = true;

            var hand = chart.hands.push(new am4charts.ClockHand());
            hand.radius = am4core.percent(97);
            
            var score = calcScore();
            setInterval(function() {
                hand.showValue(score, 2000, am4core.ease.cubicOut);
            }, 1000);


        }); 

        am4core.ready(function() {

            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            // create chart
            var chart = am4core.create("gauge2", am4charts.GaugeChart);
            chart.innerRadius = -15;

            var axis = chart.xAxes.push(new am4charts.ValueAxis());
            axis.min = 0;
            axis.max = 15;
            axis.strictMinMax = true;
            var colorSet = new am4core.ColorSet();

            var range1 = axis.axisRanges.create();
            range1.value = 0;
            range1.endValue = 5;
            range1.axisFill.fillOpacity = 1;
            range1.axisFill.fill = am4core.color("#92bce0");
            range1.axisFill.zIndex = -1;
            var range2 = axis.axisRanges.create();
            range2.value = 5;
            range2.endValue = 15;
            range2.axisFill.fillOpacity = 1;
            range2.axisFill.fill = am4core.color("#bad9fc");
            range2.axisFill.zIndex = -1;
            var range3 = axis.axisRanges.create();
            range3.value = 20;
            range3.endValue = 30;
            range3.axisFill.fillOpacity = 1;
            range3.axisFill.fill = am4core.color("#9adac3");
            range3.axisFill.zIndex = -1;

            var gradient = new am4core.LinearGradient();

            axis.renderer.line.stroke = gradient;
            axis.renderer.line.strokeWidth = 15;
            axis.renderer.line.strokeOpacity = 1;

            axis.renderer.grid.template.disabled = true;

            var hand = chart.hands.push(new am4charts.ClockHand());
            hand.radius = am4core.percent(97);
            
            var avg = average(showerL)/60;

            $("#gauge2score").html(avg.toPrecision(2) + " minutes");
            setInterval(function() {
                hand.showValue(avg, 4000, am4core.ease.cubicOut);
            }, 1000);


        }); 
        var bar = new ProgressBar.Line(progressbar, {
          strokeWidth: 1,
          easing: 'easeInOut',
          duration: 1400,
          color: '#9adac3',
          trailColor: '#eee',
          trailWidth: 1,
          svgStyle: {width: '100%', height: '100%'},
          text: {
            style: {
              // Text color.
              // Default: same as stroke color (options.color)
              color: '#000000',
              position: 'absolute',
              right: '0',
              top: '40px',
              padding: '30px',
              margin: 0,
              transform: null
            },
            autoStyleContainer: false
          },
          from: {color: '#FFEA82'},
          to: {color: '#ED6A5A'},
          step: (state, bar) => {
            if(rewards <= 2500) {   
                bar.setText(Math.round(bar.value() * 2500) + '/2500');
            }
            else {
                bar.setText(rewards + '/2500');
            }
          }
        });

        if(rewards > 2500)
        {   
            bar.animate(1.0); 
        }
        else 
        {
            bar.animate(rewards/2500); 
        }


        google.charts.setOnLoadCallback(drawBarChart);

        function drawBarChart() {
            var avgH = average(showerH);
            var avgS = average(showerL);
            var avgL = average(light);
            var data = google.visualization.arrayToDataTable([
              ['Day', 'Score Impact', { role: 'style' }],
              ['Shower Length', avgS, '#B3D9FF'],
              ['Light', avgL/3, '#88BBE4'],
              ['Shower Heat', avgH * 6, '#87DCC0'],
            ]);

            var options = {
              // title: "Environmental Performance Breakdown",
              chart: {
                title: 'Environment Score Breakdown',
                subtitle: 'Shower Heat, Shower Length, and Light Impact',
                
              },
              legend: {position: 'none'},
              vAxes: {
                    // Adds titles to each axis.
                    0: {title: 'Score Impact'}
                },

                // colors: ['#B3D9FF','#87DCC0', '#88BBE4']
            };
            var chart = new google.visualization.ColumnChart(document.getElementById('columnchart_material'));
            chart.draw(data, options);
        }

        google.charts.setOnLoadCallback(drawLineChart);


        function drawLineChart() {

            var data = google.visualization.arrayToDataTable([
              ['Day', 'Shower Heat', 'Shower Length', 'Light'],
              ['Mon', showerH[0]*6, showerL[0], light[0]/3], //0,012
              ['Tues', showerH[1]*6, showerL[1], light[1]/3],
              ['Wed', showerH[2]*6, showerL[2], light[2]/3],
              ['Thurs', showerH[3]*6, showerL[3], light[3]/3],
              ['Fri', showerH[4]*6, showerL[4], light[4]/3],
              ['Sat', showerH[5]*6, showerL[5], light[5]/3],
              ['Sun', showerH[6]*6, showerL[6], light[6]/3], //6,012
            ]);

            var dumbieData = google.visualization.arrayToDataTable([
              ['Day', 'Shower Heat', 'Shower Length', 'Light'],
              ['Mon', showerH[0]*6, showerL[0], light[0]/3],
              ['Tues', 0, 0, 0],
              ['Wed', 0, 0, 0],
              ['Thurs', 0, 0, 0],
              ['Fri', 0, 0, 0],
              ['Sat', 0, 0, 0],
              ['Sun', 0, 0, 0],
              ]);

          var options = {
            chart: {
              title: 'Weekly Performance',
              subtitle: 'Shower, Lights, and Toilet Usage'
            },
            vAxes: {
                // Adds titles to each axis.
                0: {title: 'Environmental Footprint'}
            },

            colors: ['#87DCC0','#B3D9FF', '#88BBE4']
          };

          var chart = new google.charts.Line(document.getElementById('linechart_material'));

         
          var index = 1;
          var s = setInterval(function(){
            if(index==7) {
                clearInterval(s);
            }
            if(index<7&&dumbieData.getValue(index,1) < data.getValue(index, 1)){
              dumbieData.setValue(index,1, dumbieData.getValue(index,1)+(data.getValue(index,1)/6));
            }
            if(index<7&&dumbieData.getValue(index,2) < data.getValue(index, 2)){
              dumbieData.setValue(index,2, dumbieData.getValue(index,2)+(data.getValue(index,2)/6));
            }
            if(index<7&&dumbieData.getValue(index,3) < data.getValue(index, 3)){
              dumbieData.setValue(index,3, dumbieData.getValue(index,3)+(data.getValue(index,3)/6));
            }
            if(index<7&&dumbieData.getValue(index,1)>=data.getValue(index,1) && dumbieData.getValue(index,2)>=data.getValue(index,2) && dumbieData.getValue(index,3)>=data.getValue(index,3))
            {
              index++;
            }


            chart.draw(dumbieData, google.charts.Line.convertOptions(options));

          }, 30);
        }
    }

    function resizeGoogleCharts() {
      google.charts.setOnLoadCallback(drawBarChart);

        function drawBarChart() {
            var avgH = average(showerH);
            var avgS = average(showerL);
            var avgL = average(light);
            var data = google.visualization.arrayToDataTable([
              ['Day', 'Score Impact', { role: 'style' }],
              ['Shower Length', avgS, '#B3D9FF'],
              ['Light', avgL/3, '#88BBE4'],
              ['Shower Heat', avgH * 6, '#87DCC0'],
            ]);

            var options = {
              // title: "Environmental Performance Breakdown",
              chart: {
                title: 'Environment Score Breakdown',
                subtitle: 'Shower Heat, Shower Length, and Light Impact',
                
              },
              legend: {position: 'none'},
              vAxes: {
                    // Adds titles to each axis.
                    0: {title: 'Score Impact'}
                },

                // colors: ['#B3D9FF','#87DCC0', '#88BBE4']
            };
            var chart = new google.visualization.ColumnChart(document.getElementById('columnchart_material'));
            chart.draw(data, options);
        }

        google.charts.setOnLoadCallback(drawLineChart);


        function drawLineChart() {

            var data = google.visualization.arrayToDataTable([
              ['Day', 'Shower Heat', 'Shower Length', 'Light'],
              ['Mon', showerH[0]*6, showerL[0], light[0]/3], //0,012
              ['Tues', showerH[1]*6, showerL[1], light[1]/3],
              ['Wed', showerH[2]*6, showerL[2], light[2]/3],
              ['Thurs', showerH[3]*6, showerL[3], light[3]/3],
              ['Fri', showerH[4]*6, showerL[4], light[4]/3],
              ['Sat', showerH[5]*6, showerL[5], light[5]/3],
              ['Sun', showerH[6]*6, showerL[6], light[6]/3], //6,012
            ]);

            var dumbieData = google.visualization.arrayToDataTable([
              ['Day', 'Shower Heat', 'Shower Length', 'Light'],
              ['Mon', showerH[0]*6, showerL[0], light[0]/3],
              ['Tues', 0, 0, 0],
              ['Wed', 0, 0, 0],
              ['Thurs', 0, 0, 0],
              ['Fri', 0, 0, 0],
              ['Sat', 0, 0, 0],
              ['Sun', 0, 0, 0],
              ]);

          var options = {

            chart: {
              title: 'Weekly Performance',
              subtitle: 'Shower, Lights, and Toilet Usage'
            },
            vAxes: {
                // Adds titles to each axis.
                0: {title: 'Environmental Footprint'}
            },

            colors: ['#87DCC0','#B3D9FF', '#88BBE4']
          };

          var chart = new google.charts.Line(document.getElementById('linechart_material'));

         
          var index = 1;
          var s = setInterval(function(){
            if(index==7) {
                clearInterval(s);
            }
            if(index<7&&dumbieData.getValue(index,1) < data.getValue(index, 1)){
              dumbieData.setValue(index,1, dumbieData.getValue(index,1)+(data.getValue(index,1)/6));
            }
            if(index<7&&dumbieData.getValue(index,2) < data.getValue(index, 2)){
              dumbieData.setValue(index,2, dumbieData.getValue(index,2)+(data.getValue(index,2)/6));
            }
            if(index<7&&dumbieData.getValue(index,3) < data.getValue(index, 3)){
              dumbieData.setValue(index,3, dumbieData.getValue(index,3)+(data.getValue(index,3)/6));
            }
            if(index<7&&dumbieData.getValue(index,1)>=data.getValue(index,1) && dumbieData.getValue(index,2)>=data.getValue(index,2) && dumbieData.getValue(index,3)>=data.getValue(index,3))
            {
              index++;
            }


            chart.draw(dumbieData, google.charts.Line.convertOptions(options));

          }, 30);
        }
    }




    $(window).resize(function () {
          resizeGoogleCharts();      
      });
    



});