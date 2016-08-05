/*global $, jQuery alert*/
"use strict";

function searchInfo(data) {
    var ul = document.getElementById("listresults");
    console.log(data);
    for (var i = 0; i < data.query.search.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = "<li><div class=\"boxed\"> <h5> <a href=\"https://en.wikipedia.org/wiki/" + data.query.search[i].title + "\" " +
            "target = \"_blank\">" + data.query.search[i].title + "</a></h5><p>" + data.query.search[i].snippet + "</p></div></li>";
        ul.appendChild(li);
    }
}

$("#searchform").submit(function (event) {
    $("#listresults").empty();
    //var a = "https://en.wikipedia.org/w/api.php?action=query&exintro&list=search&srsearch=" + document.getElementById("srch-term").value + "&format=json&callback=?";
    var searchQuery = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + document.getElementById("srch-term").value + "&limit=100&namespace=0&format=json&callback=?";
    $.getJSON(searchQuery, searchInfo, 'jsonp');
    event.preventDefault();
});

$('#searchform').on("submit", function () {
    $('#results').show();
});