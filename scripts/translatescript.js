$(document).ready(function () {

    var config = {
        "apiKey" : "AIzaSyCm6oWzvhDOi3szra2UQja7wm19K1lsb",
        "authDomain": "americanairlines-f737a.firebaseapp.com",
        "databaseURL": "https://americanairlines-f737a.firebaseio.com/",
        "storageBucket": "americanairlines-f737a.appspot.com"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    var translator = localStorage.getItem("translator");

    // get translator profile from firebase database
    var refT = database.ref("translators/" + translator);
    refT.once("value", gotTData, errData);

    console.log(localStorage.getItem("translator"));

    // get order from firebase database
    var ref = database.ref("orders/" + translator);
    ref.once("value", gotData, errData);

    var nextFlight = -1;
    var customerName = "";
    var departureTime = "";
    var imgUrl = "";
    var transName = "";

    // laod translator name
    function gotTData(data) {
        var dataVal = data.val();
        transName = dataVal["first"];
        $("#travelerLabel").html(transName +", Here is Your Travel Buddy.");
    }

    // load customer info
    function gotData(data) {
            console.log(data.val());
            var dataVal = data.val();
            departureTime = dataVal["departure"];
            nextFlight = dataVal["next"];
            customerName = dataVal["first"];
            $("#name").html(customerName);
            $("#next").html(nextFlight);
            $("#dep").html(departureTime.slice(11,19));
            imgUrl = "pics/"+ dataVal["url"];
            $("#propic").attr("src",imgUrl);
            console.log(imgUrl);

    }

    function errData(data) {
        console.log("Error!");
    }

});