$(document).ready(function () {

    var rewards = localStorage.getItem("Rewards");
    $("#rewards").html(rewards);

     $(".giftbtn").click(function () {
     	if(rewards < 2500)
     	{
     		alert("You don't have enough points")
     	}
    });

});