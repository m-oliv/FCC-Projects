/*jslint browser: true*/
/*global $, jQuery, alert*/

// URL to the API
var quoteURL = "http://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=jsonp&lang=en&jsonp=?";

// temp vars that save info to tweet
var text = "";
var author = "";

// get the quote and the author
var qInfo  = function (data) {
    "use strict";
    // pass the info to the corresponding html
    $(".text").text(data.quoteText);
    $(".author").text(data.quoteAuthor);
    
    // prevent cases in which there's no author
    if (data.quoteAuthor === "") {
        $(".author").text("Anonymous");
    }
    
    // save info to tweet in vars
    text = data.quoteText;
    author = data.quoteAuthor;
    
};

// get a quote when the page loads
$(document).ready(function () {
    "use strict";
    $.getJSON(quoteURL, qInfo, 'jsonp');
});

// get next quote when button is clicked
$("#nextQ").click(function () {
    "use strict";
    $.getJSON(quoteURL, qInfo, 'jsonp');
});

// tweet quote when button is clicked
$("#tweetlink").click(function () {
    "use strict";
    // get quote string (as per twitter's guidelines)
    var tweetQ = 'https://twitter.com/intent/tweet?text=' + text  + ' - ' + author;
    // pass string as href
    $("#tweetlink").attr("href", tweetQ);
});