/*global $, jQuery alert*/
"use strict";

function searchInfo(data) {
    console.log(data[1]);
    var ul = document.getElementById("listresults");
    var numResults = data[1].length;
    console.log(data);
    for (var i = 0; i < numResults; i++) {
        var li = document.createElement("li");
        li.innerHTML = "<li><div class=\"boxed\"> <h5> <a href=\"" + data[3][i] + "\" " +
            "target = \"_blank\">" + data[1][i] + "</a></h5><p>" + data[2][i] + "</p></div></li>";
        ul.appendChild(li);
    }
}

$("#searchform").submit(function (event) {
    $("#listresults").empty();
    var searchQuery = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + document.getElementById("srch-term").value + "&limit=100&namespace=0&format=json&callback=?";
    $.getJSON(searchQuery, searchInfo, 'jsonp');
    event.preventDefault();
});

$('#searchform').on("submit", function () {
    $('#results').show();
});