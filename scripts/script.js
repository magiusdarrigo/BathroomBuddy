$(document).ready(function () {

    var config = {
      apiKey: "AIzaSyBKUq4OsZ2Y6lI_MuL3_EynuM35LNZ98-g",
      authDomain: "sink-timer.firebaseapp.com",
      databaseURL: "https://sink-timer.firebaseio.com",
      storageBucket: "sink-timer.appspot.com",
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    // get customer from firebase database
    $("#loginbtn").click(function () {
        console.log($("#login").val());
        var ref = database.ref("Users/" + $("#login").val());
        ref.once("value", gotData, errData);
    });

    // if customer exists, cache ffn and relocate to booker view
    function gotData(data) {
        var dataVal = data.val();
        console.log(dataVal);
        console.log(dataVal["IP"]);
        console.log(dataVal["Rewards"]);
        console.log(dataVal["Device"]);
        console.log(dataVal["Name"]);
        if(!(data.val() == null))
        {
            localStorage.setItem("customer", $("#login").val());
            localStorage.setItem("IP", dataVal["IP"]);
            localStorage.setItem("Rewards", dataVal["Rewards"]);
            localStorage.setItem("Device", dataVal["Device"]);
            localStorage.setItem("FirstName", dataVal["Name"]);
            $(location).attr("href", "dashboard.html");
        }
    }

    function errData(data) {
        console.log("Error!");
    }

});