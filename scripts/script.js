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
        // var ref = database.ref("users/" + $("#ffn").val());
        // ref.once("value", gotData, errData);
        gotData($("#login").val());
    });

    // if customer exists, cache ffn and relocate to booker view
    function gotData(data) {
        console.log(data);
        if(!(data == null))
        {
            localStorage.setItem("customer", $("#login").val());
            $(location).attr("href", "dashboard.html");
        }

        // console.log(data.val());
        // if(!(data.val() == null))
        // {
        //     localStorage.setItem("customer", $("#login").val());
        //     $(location).attr("href", "dashboard.html");
        // }
    }

    function errData(data) {
        console.log("Error!");
    }

});