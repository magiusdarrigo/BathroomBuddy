$(document).ready(function () {

    var config = {
        "apiKey" : "AIzaSyCm6oWzvhDOi3szra2UQja7wm19K1lsb",
        "authDomain": "americanairlines-f737a.firebaseapp.com",
        "databaseURL": "https://americanairlines-f737a.firebaseio.com/",
        "storageBucket": "americanairlines-f737a.appspot.com"
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