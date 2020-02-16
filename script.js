$(document).ready(function () {
    $("#getBtn").click(function () {
        $.get("https://candidate.hubteam.com/candidateTest/v3/problem/dataset?userKey=c767c57a7e1e57998e988c5ada0d", function (data, status) {
            alert(status);
            loadData(data.partners);
        })

    });
    var countries = [];
    function loadData(data) {
        var i = 0;
        var partner = data[0];
        var dates = partner.availableDates;
        var diff = dates[1] - dates[0];
        alert(diff);
        //while (i < data.length) {
        //    var partner = data[i];
        //    var dates = partner.availableDates;
        //    var prev;
        //    var next;
        //    for (var j = 0; j < dates.length; j++) {
        //        next = dates[j];
        //        if (prev) {
        //            if (next - prev == 1) {

        //            }
        //        }
        //        prev = next;
        //    }
        //    i++;
        //}

    };

});