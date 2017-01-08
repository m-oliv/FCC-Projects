/*jslint browser: true*/
/*global $, jQuery, alert*/
"use strict";
// URL to the API
var quoteURL = "http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=jsonp&lang=en&jsonp=?";

// temp vars that save info to tweet
var text = "";
var author = "";

// get the quote and the author
function getQuoteAndAuthor (data) {
    // pass the info to the corresponding html
    $(".text").text(data.quoteText);
    $(".author").text(data.quoteAuthor);
    
    // prevent cases in which there's no author
    if (data.quoteAuthor === "") {
        $(".author").text("Anonymous");
    }
    
    // save info to tweet in vars (to be used in other contexts)
    text = data.quoteText;
    author = data.quoteAuthor;
};

// get a quote when the page loads
$(document).ready(function () {
    $.getJSON(quoteURL, getQuoteAndAuthor, 'jsonp');
});

// get next quote when button is clicked
$("#nextQ").click(function () {
    $.getJSON(quoteURL, getQuoteAndAuthor, 'jsonp');
});

// tweet quote when button is clicked
$("#tweetlink").click(function () {
    // get quote string (as per twitter's guidelines) and pass it as href
    $("#tweetlink").attr("href", 'https://twitter.com/intent/tweet?text=' + text  + ' - ' + author);
});