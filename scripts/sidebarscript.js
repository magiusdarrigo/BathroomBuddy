$(document).ready(function () {

    var name = localStorage.getItem("FirstName");
    $("h3").html("Welcome, " + name);

});