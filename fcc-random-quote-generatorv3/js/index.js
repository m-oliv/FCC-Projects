/*jslint browser: true*/
/*global $, jQuery, alert*/
"use strict";
// URL to the API
var quoteURL = "http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=jsonp&lang=en&jsonp=?";

// temp vars that save info to tweet
var text = "";
var author = "";

// get the quote and the author
function getQuoteAndAuthor(dataString) {
    var data = JSON.parse(dataString);

    // pass the info to the corresponding html
    $(".text").text(data.quote);
    $(".author").text(data.author);

    // prevent cases in which there's no author
    if (data.author === "") {
        $(".author").text("Anonymous");
    }

    // save info to tweet in vars (to be used in other contexts)
    text = data.quote;
    author = data.author;
};

// Request the quote data(author and quote text) from the API.
function getQuoteDataRequest() {
    $.ajax({
        headers: {
            "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
        success: getQuoteAndAuthor
    });
}

// get a quote when the page loads
$(document).ready(function () {
    getQuoteDataRequest();
});

// get next quote when button is clicked
$("#nextQ").click(function () {
    getQuoteDataRequest();
});

// tweet quote when button is clicked
$("#tweetlink").click(function () {
    // get quote string (as per twitter's guidelines) and pass it as href
    $("#tweetlink").attr("href", 'https://twitter.com/intent/tweet?text=' + text + ' - ' + author);
});