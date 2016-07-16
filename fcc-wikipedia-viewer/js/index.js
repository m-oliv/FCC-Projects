/*global $, jQuery, alert*/

function searchInfo(data) {
    "use strict";
    //document.getElementById('test').innerHTML = data.query.search[0].title;
    var ul = document.getElementById("listresults");
    
    for (var i = 0; i< data.query.search.length; i++){
        var li = document.createElement("li");
        li.innerHTML = "<li><div class=\"boxed\"> <h5> <a href=\"https://en.wikipedia.org/wiki/" + data.query.search[i].title + "\" target = \"_blank\">" + data.query.search[i].title +"</a></h5><p>" + data.query.search[i].snippet + "</p></div></li>";
        ul.appendChild(li);
    }
}

$("#searchform").submit(function (event) {
    "use strict";
    $("#listresults").empty();
    var a = "https://en.wikipedia.org/w/api.php?action=query&limit=10&list=search&srsearch=" + document.getElementById("srch-term").value + "&format=json&callback=?";
    $.getJSON(a, searchInfo, 'jsonp');
    event.preventDefault();
});