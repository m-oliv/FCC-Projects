/*global $, jQuery alert*/
"use strict";

function searchInfo(data) {
    console.log(data[1]);
    var ul = document.getElementById("listresults");
    var numResults = data[1].length;
    console.log(data);
    for (var i = 0; i < numResults; i++) {
        var li = document.createElement("li");
        li.innerHTML = "<li><div class=\"boxed\"><a href=\"" + data[3][i] + "\"+" +
            "target = \"_blank\"><h5>" + data[1][i] + "</h5></a><hr><p>" + data[2][i] + "</p></div></li>";
        ul.appendChild(li);
    }
}

$("#searchform").submit(function (event) {
    $("#listresults").empty();
    var searchQuery = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" +
        document.getElementById("srch-term").value + "&limit=100&namespace=0&format=json&callback=?";
    $.getJSON(searchQuery, searchInfo, 'jsonp');
    event.preventDefault();
});

$('#searchform').on("submit", function () {
    $('#results').show();
});

$(document).ready(function () {

    var offset = 250;
    var duration = 300;
    $(window).scroll(function () {
        if ($(this).scrollTop() > offset) {
            $('.back-to-top').fadeIn(duration);
        } else {
            $('.back-to-top').fadeOut(duration);
        }
    });
    $('.back-to-top').click(function (event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: 0}, duration);
        return false;
    })
});