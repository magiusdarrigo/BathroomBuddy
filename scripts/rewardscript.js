$(document).ready(function () {

    var rewards = localStorage.getItem("Rewards");
    $("#rewardlabel").html("Rewards Points: "+ rewards);

    if(rewards > 2500) {
        $("#mathlabel").html("Congrats! You may claim a prize!");
    }
    else {
        $("#mathlabel").html((2500-rewards) +" more points until your next prize!");
    }
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
        // bar.setValue(rewards);
        bar.animate(1.0); 
    }
    else 
    {
        bar.animate(rewards/2500); 
    }

     $(".giftbtn").click(function () {
     	if(rewards < 2500)
     	{
     		alert("You don't have enough points")
     	}
    });

});