$('.slide').hiSlide();

$(document).ready(function () {

    var config = {
    "apiKey" : "AIzaSyCm6oWzvhDOi3szra2UQja7wm19K1lsb",
    "authDomain": "americanairlines-f737a.firebaseapp.com",
    "databaseURL": "https://americanairlines-f737a.firebaseio.com/",
    "storageBucket": "americanairlines-f737a.appspot.com"
    };
    
    firebase.initializeApp(config);

    var database = firebase.database();

    var customer = localStorage.getItem("customer");
    console.log(localStorage.getItem("customer"));

    // get customer from users table in firebase database
    var ref = database.ref("users/" + customer);
    ref.once("value", gotData, errData);


    var nextFlight = -1;
    var customerName = "";
    var departureTime = "";
    var imgUrl = "";

    // get data of customer and their flight
    function gotData(data) {
        console.log(data.val());
        var dataVal = data.val();
        var currentFlight = dataVal["currentFlight"];
        nextFlight = dataVal["nextFlight"];
        customerName = dataVal["first"];
        imgUrl = dataVal["url"];
        console.log("nextFlight");
        var refF = database.ref("flights/" + nextFlight);
        refF.once("value", gotFData, errData);
    }

    // get data of customer flight from flight api
    function gotFData(data) {
        var dataVal = data.val();
        departureTime = dataVal["departureTime"];
        console.log(departureTime);
    }

    function errData(data) {
        console.log("Error!");
    }

    // add order to firebase database when book is clicked
    $(".book").click(function () {
        var translatorID = $(this).attr('id');
        var refOrders = database.ref("orders/"+ translatorID);
        refOrders.set({
            first: customerName,
            departure: departureTime,
            url: imgUrl,
            next : nextFlight
        });
        alert("Thank you for booking! Please meet your translator when you deplane.")
        
    });

});