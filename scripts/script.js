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
    $("#orderto").click(function () {
        var ref = database.ref("users/" + $("#ffn").val());
        ref.once("value", gotData, errData);
    });

    // get translator from firebase database
    $("#imto").click(function () {
        var ref = database.ref("translators/" + $("#ffn").val());
        ref.once("value", gotTData, errData);

    });

    // if customer exists, cache ffn and relocate to booker view
    function gotData(data) {
        console.log(data.val());
        if(!(data.val() == null))
        {
            localStorage.setItem("customer", $("#ffn").val());
            $(location).attr("href", "booker.html");
        }
    }

    // if translator exists, cache ffn and relocate to translator view
    function gotTData(data) {
        console.log(data.val());
        if(!(data.val() == null))
        {
            localStorage.setItem("translator", $("#ffn").val());
            $(location).attr("href", "translate.html");
            
        }
    }

    function errData(data) {
        console.log("Error!");
    }

});