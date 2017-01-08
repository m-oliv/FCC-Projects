/*global $, jQuery alert*/
"use strict";

// process the search data returned by wikipedia
function searchInfo(data) {
    console.log(data[1]);
    var ul = document.getElementById("listresults");
    console.log(data);
    for (var i = 0; i < data[1].length; i++) {
        var li = document.createElement("li");
        li.innerHTML = "<div class=\"boxed\"><a href=\"" + data[3][i] + "\"" +
            "target = \"_blank\"><h5>" + data[1][i] + "</h5></a><hr><p>" + data[2][i] + "</p></div>";
        ul.appendChild(li);
    }
}

// search using the wikipedia api
$("#searchform").submit(function (event) {
    $("#listresults").empty();
    var searchQuery = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" +
        document.getElementById("srch-term").value + "&limit=100&namespace=0&format=json&callback=?";
    $.getJSON(searchQuery, searchInfo, 'jsonp');
    event.preventDefault();
    $('#results').show();
});

$(document).ready(function () {
    var offset = 250;
    var duration = 300;

    // disables the search button when there's nothing in the input field    
    $('#srch-term').keyup(function () {

        var empty = false;
        $('#srch-term').each(function () {
            if ($(this).val().length == 0) {
                empty = true;
            }
        });

        if (empty) {
            $('#searchbtn').attr('disabled', 'disabled');
        } else {
            $('#searchbtn').removeAttr('disabled');
        }
    });

    // scroll to top when the back to top button is clicked
    $(window).scroll(function () {
        if ($(this).scrollTop() > offset) {
            $('.back-to-top').fadeIn(duration);
        } else {
            $('.back-to-top').fadeOut(duration);
        }
    });

    $('.back-to-top').click(function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, duration);
        return false;
    })
});