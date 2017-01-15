/*jslint browser: true*/
/*jslint white: true*/
/*global $, jQuery, alert*/
"use strict";

// constants
var API_ACCESS = {
    "ID": "117asdf01asd3c397726059952b18544",
    "BIT": "d1851bc227",
    "SEED": "asdf01asd3"
};
var DIRECTIONS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
var IMPERIAL_UNITS = "imperial";
var METRIC_UNITS = "metric";
var IMPERIAL_UNITS_COUNTRIES = ["US", "LR", "BS", "BZ", "KY", "KW", "MM"];

var WEATHER_INFO_ID = "weatherInfo";
var BACKGROUND_IMAGE_CSS = "background-image";
var WEATHER_ICON_ID = "weatherIcon";

// image URLs
var CLEAR_SKY_BACKGROUND = "https://farm9.staticflickr.com/8660/16712341612_1acf44685c_o_d.jpg";

function getK() {
    return API_ACCESS.ID.replace(API_ACCESS.SEED, API_ACCESS.BIT);
}

// Get wind direction
function getWindDir(angle) {
    return DIRECTIONS[Math.round((angle / 45))];
}

// Get units based on location
function getUnits(country) {
    if (IMPERIAL_UNITS_COUNTRIES.indexOf(country) !== -1) {
        return IMPERIAL_UNITS;
    } else {
        return METRIC_UNITS;
    }
}

// change color of everything to white
function allWhite() {
    $('h1').css('color', "white");
    $('#locationInfo').css('color', "white");
    $('#windDir').css('color', "white");
    $('#windIcon').css('color', "white");
    $('#windSpeed').css('color', "white");
    $('#weatherIcon').css('color', "white");
    $('#temp, #wid').css('color', "white");
}

// get icon and bg image, apply correct color config
function getWeatherIconBG(weatherID) {
    var icon = document.createElement('i');
    icon.id = WEATHER_INFO_ID;

    switch (weatherID) {
        // clear
        case 800:
        case 951:
            $('body').css(BACKGROUND_IMAGE_CSS, "url("+CLEAR_SKY_BACKGROUND+")");
            icon.innerHTML = "<i id ="+WEATHER_ICON_ID+" class = \"wi wi-day-sunny\"></i>";
            document.getElementById(WEATHER_INFO_ID).insertBefore(icon, document.getElementById(WEATHER_INFO_ID).firstChild);
            break;
            // mist / haze / fog
        case 701:
        case 721:
        case 741:
            $('body').css('background-image', "url(\"http://wallpaperus.org/wallpapers/05/205/dock-fog-1920x1080-wallpaper-874500.jpg\")");
            icon.innerHTML = "<i id =\"weatherIcon\" class = \"wi wi-fog\"></i>";
            document.getElementById('weatherInfo').insertBefore(icon, document.getElementById('weatherInfo').firstChild);
            $('#country').css('color', "white");
            $('#time').css('color', "white");
            allWhite();
            break;
            // sand 
        case 731:
        case 751:
        case 761:
            $('body').css('background-image', "url(\"https://pixabay.com/static/uploads/photo/2013/07/19/17/02/sandstorm-165332_960_720.jpg\")");
            icon.innerHTML = "<i id =\"weatherIcon\" class = \"wi wi-sandstorm\"></i>";
            document.getElementById('weatherInfo').insertBefore(icon, document.getElementById('weatherInfo').firstChild);
            break;
            // smoke
        case 711:
            $('body').css('background-image', "url(\"https://farm6.staticflickr.com/5616/15425029170_4df04cc9c6_o_d.jpg\")");
            icon.innerHTML = "<i id =\"weatherIcon\" class = \"wi wi-smoke\"></i>";
            document.getElementById('weatherInfo').insertBefore(icon, document.getElementById('weatherInfo').firstChild);
            $('#country').css('color', "white");
            $('#time').css('color', "white");
            allWhite();
            break;
            // volcanic ash
        case 762:
            $('body').css('background-image', "url(\"https://farm8.staticflickr.com/7457/12564894603_c4223656c9_b.jpg\")");
            icon.innerHTML = "<i id =\"weatherIcon\" class = \"wi wi-volcano\"></i>";
            document.getElementById('weatherInfo').insertBefore(icon, document.getElementById('weatherInfo').firstChild);
            break;
            // tornado
        case 781:
        case 900:
            $('body').css('background-image', "url(\"https://farm6.staticflickr.com/5263/5741513041_c34398754f_o_d.jpg\")");
            icon.innerHTML = "<i id =\"weatherIcon\" class = \"wi wi-tornado\"></i>";
            document.getElementById('weatherInfo').insertBefore(icon, document.getElementById('weatherInfo').firstChild);
            $('#country').css('color', "white");
            $('#time').css('color', "white");
            allWhite();
            break;
            // tropical storm / hurricane
        case 901:
        case 902:
        case 962:
            $('body').css('background-image', "url(\"https://pixabay.com/static/uploads/photo/2015/11/18/17/38/hurricane-1049612_960_720.jpg\")");
            icon.innerHTML = "<i id =\"weatherIcon\" class = \"wi wi-hurricane\"></i>";
            document.getElementById('weatherInfo').insertBefore(icon, document.getElementById('weatherInfo').firstChild);
            break;
            // cold
        case 903:
            $('body').css('background-image', "url(\"https://pixabay.com/static/uploads/photo/2016/03/04/16/03/snowflakes-1236245_960_720.jpg\")");
            icon.innerHTML = "<i id =\"weatherIcon\" class = \"wi wi-snowflake-cold\"></i>";
            document.getElementById('weatherInfo').insertBefore(icon, document.getElementById('weatherInfo').firstChild);
            break;
            // hot
        case 904:
            $('body').css('background-image', "url(\"https://farm4.staticflickr.com/3293/2657581054_ba86135d6b_o_d.jpg\")");
            icon.innerHTML = "<i id =\"weatherIcon\" class = \"wi wi-hot\"></i>";
            document.getElementById('weatherInfo').insertBefore(icon, document.getElementById('weatherInfo').firstChild);
            $('#country').css('color', "white");
            $('#time').css('color', "white");
            allWhite();
            $('#windDir').css('color', "black");
            $('#windIcon').css('color', "black");
            $('#windSpeed').css('color', "black");
            break;
            // windy
        case 905:
        case 956:
            $('body').css('background-image', "url(\"https://farm8.staticflickr.com/7256/7432830630_913c75cffc_o_d.jpg\")");
            icon.innerHTML = "<i id =\"weatherIcon\" class = \"wi wi-windy\"></i>";
            document.getElementById('weatherInfo').insertBefore(icon, document.getElementById('weatherInfo').firstChild);
            $('#country').css('color', "white");
            $('#time').css('color', "white");
            allWhite();
            break;
            // hail
        case 906:
            $('body').css('background-image', "url(\"https://farm4.staticflickr.com/3156/2587411940_d1fa273bb9_o_d.jpg\")");
            icon.innerHTML = "<i id =\"weatherIcon\" class = \"wi wi-hail\"></i>";
            document.getElementById('weatherInfo').insertBefore(icon, document.getElementById('weatherInfo').firstChild);
            $('#country').css('color', "white");
            $('#time').css('color', "white");
            allWhite();
            break;
            // storm
        case 960:
        case 961:
            $('body').css('background-image', "url(\"https://farm7.staticflickr.com/6086/6145122499_2dcdaa3483_o_d.jpg\")");
            icon.innerHTML = "<i id =\"weatherIcon\" class = \"wi wi-storm-showers\"></i>";
            document.getElementById('weatherInfo').insertBefore(icon, document.getElementById('weatherInfo').firstChild);
            $('#country').css('color', "white");
            $('#time').css('color', "white");
            allWhite();
            break;
            // strong winds
        case 957:
        case 958:
        case 959:
            $('body').css('background-image', "url(\"https://farm8.staticflickr.com/7043/6882873263_cce47e6c2e_o_d.jpg\")");
            icon.innerHTML = "<i id =\"weatherIcon\" class = \"wi wi-strong-wind\"></i>";
            document.getElementById('weatherInfo').insertBefore(icon, document.getElementById('weatherInfo').firstChild);
            $('#country').css('color', "white");
            $('#time').css('color', "white");
            allWhite();
            $('#windDir').css('color', "black");
            $('#windIcon').css('color', "black");
            $('#windSpeed').css('color', "black");
            break;


    }

    if (weatherID >= 200 && weatherID < 233) { // thunderstorm
        icon.innerHTML = "<i id =\"weatherIcon\" class = \"wi wi-thunderstorm\"></i>";
        document.getElementById('weatherInfo').insertBefore(icon, document.getElementById('weatherInfo').firstChild);
        $('body').css('background-image', "url(\"https://static.pexels.com/photos/56614/lightning-storm-night-firebird-56614.jpeg\")");
        $('#country').css('color', "white");
        $('#time').css('color', "white");
        allWhite();
    } else if (weatherID >= 300 && weatherID < 322) { // drizzle
        $('body').css('background-image', "url(\"https://static.pexels.com/photos/39811/pexels-photo-39811.jpeg\")");
        icon.innerHTML = "<i id =\"weatherIcon\" class = \"wi wi-raindrops\"></i>";
        document.getElementById('weatherInfo').insertBefore(icon, document.getElementById('weatherInfo').firstChild);
        $('#country').css('color', "white");
        $('#time').css('color', "white");
        allWhite();
    } else if (weatherID >= 500 && weatherID < 532) { // rain
        $('body').css('background-image', "url(\"https://static.pexels.com/photos/68084/pexels-photo-68084.jpeg\")");
        icon.innerHTML = "<i id =\"weatherIcon\" class = \"wi wi-rain\"></i>";
        document.getElementById('weatherInfo').insertBefore(icon, document.getElementById('weatherInfo').firstChild);
        $('#country').css('color', "white");
        $('#time').css('color', "white");
        allWhite();
    } else if (weatherID >= 600 && weatherID < 623) { // snow
        $('body').css('background-image', "url(\"https://static.pexels.com/photos/24378/pexels-photo-24378.jpg\")");
        icon.innerHTML = "<i id =\"weatherIcon\" class = \"wi wi-snow\"></i>";
        document.getElementById('weatherInfo').insertBefore(icon, document.getElementById('weatherInfo').firstChild);
        $('h1').css('color', "white");
        $('#weatherIcon').css('color', "white");
        $('#weatherIcon, #temp, #wid').css('color', "white");
    } else if ((weatherID >= 801 && weatherID < 805) || weatherID === 771) { // clouds / squalls
        $('body').css('background-image', "url(\"https://static.pexels.com/photos/215/road-sky-clouds-cloudy.jpg\")");
        icon.innerHTML = "<i id =\"weatherIcon\" class = \"wi wi-cloudy\"></i>";
        document.getElementById('weatherInfo').insertBefore(icon, document.getElementById('weatherInfo').firstChild);
        $('#country').css('color', "white");
        $('#time').css('color', "white");
    } else if (weatherID >= 952 && weatherID < 955) { // light / gentle /  moderate breeze
        $('body').css('background-image', "url(\"http://65.media.tumblr.com/1adc4029ef3a31124f222add70fa3553/tumblr_n2k1499dIp1st5lhmo1_1280.jpg\")");
        icon.innerHTML = "<i id =\"weatherIcon\" class = \"wi wi-windy\"></i>";
        document.getElementById('weatherInfo').insertBefore(icon, document.getElementById('weatherInfo').firstChild);
        $('#country').css('color', "white");
        $('#time').css('color', "white");
        allWhite();
    }

}

// get the correct wind icon
function getWindIcon(dir) {
    "use strict";
    var icon = document.createElement('i');

    icon.id = 'windInfo';

    switch (dir) {
        case 'N':
            icon.innerHTML = "<i id =\"windIcon\" class = \"wi wi-wind towards-0-deg\"></i>";
            document.getElementById('windDir').innerHTML = 'N';
            break;
        case 'NE':
            icon.innerHTML = "<i id =\"windIcon\" class = \"wi wi-wind towards-45-deg\"></i>";
            document.getElementById('windDir').innerHTML = 'NE';
            break;
        case 'E':
            icon.innerHTML = "<i id =\"windIcon\" class = \"wi wi-wind towards-90-deg\"></i>";
            document.getElementById('windDir').innerHTML = 'E';
            break;
        case 'SE':
            icon.innerHTML = "<i id =\"windIcon\" class = \"wi wi-wind towards-135-deg\"></i>";
            document.getElementById('windDir').innerHTML = 'SE';
            break;
        case 'S':
            icon.innerHTML = "<i id =\"windIcon\" class = \"wi wi-wind towards-180-deg\"></i>";
            document.getElementById('windDir').innerHTML = 'S';
            break;
        case 'SW':
            icon.innerHTML = "<i id =\"windIcon\" class = \"wi wi-wind towards-225-deg\"></i>";
            document.getElementById('windDir').innerHTML = 'SW';
            break;
        case 'W':
            icon.innerHTML = "<i id =\"windIcon\" class = \"wi wi-wind towards-270-deg\"></i>";
            document.getElementById('windDir').innerHTML = 'W';
            break;
        case 'NW':
            icon.innerHTML = "<i id =\"windIcon\" class = \"wi wi-wind towards-313-deg\"></i>";
            document.getElementById('windDir').innerHTML = 'NW';
            break;
    }
    document.getElementById('windInfo').insertBefore(icon, document.getElementById('windInfo').firstChild);
}

// get current time (HH:MM)
function getCurrentTime() {
    "use strict";
    var d = new Date(),
        h = d.getHours(),
        min = d.getMinutes();
    if (h < 10) {
        h = "0" + d.getHours();
    }

    if (min < 10) {
        min = "0" + d.getMinutes();
    }

    return h + ":" + min + " h";
}

// convert first letter of each word of the weather description to uppercase
function titleCase(str) {
    "use strict";
    var s1 = str.toLowerCase(),
        s = s1.split(" ");

    for (var i = 0; i < s.length; i++) {
        s[i] = s[i].charAt(0).toUpperCase() + s[i].substr(1).toLowerCase();
    }

    var s2 = s.join(" ");
    return s2;
}

// Get current weather
function getWeather(un) {
    // get location data
    $.getJSON('http://ip-api.com/json/').done(function (data) {
        var c = data.country,
            url = "";

        // Check if the units
        if (un === "") {
            // predefined units (based on location)
            url = "http://api.openweathermap.org/data/2.5/weather?lat=" + data.lat + "&lon=" + data.lon + "&units=" + getUnits(c) + "&APPID=" + getK();
        } else {
            // custom units (based on toggle)
            url = "http://api.openweathermap.org/data/2.5/weather?lat=" + data.lat + "&lon=" + data.lon + "&units=" + un + "&APPID=" + getK();
        }
        if (c === 'US') {
            document.getElementById('country').innerHTML = "Your Location: " + data.city + ", " + data.regionName + ", " + c;
        } else {
            document.getElementById('country').innerHTML = "Your Location: " + data.city + ", " + c;
        }


        // Get weather data
        $.getJSON(url).done(function (data) {
            document.getElementById('wid').innerHTML = titleCase(data.weather[0].description);
            if (un === 'metric' || un === "") {
                document.getElementById('temp').innerHTML = data.main.temp.toFixed(1) + " ºC";
                document.getElementById('windSpeed').innerHTML = (data.wind.speed * 3.6).toFixed(1) + " km/h";
            } else {
                document.getElementById('temp').innerHTML = data.main.temp + " ºF";
                document.getElementById('windSpeed').innerHTML = data.wind.speed + " mph";
            }

            document.getElementById('time').innerHTML = "Your Time: " + getCurrentTime();

            // apply wind icon
            if (document.contains(document.getElementById('windIcon'))) {
                document.getElementById('windIcon').remove();
                getWindIcon(getWindDir(data.wind.deg));
            } else {
                getWindIcon(getWindDir(data.wind.deg));
            }

            // apply weather icon / bg / color config
            if (document.contains(document.getElementById('weatherIcon'))) {
                document.getElementById('weatherIcon').remove();
                getWeatherIconBG(data.weather[0].id);
            } else {
                getWeatherIconBG(data.weather[0].id);
            }

        });
    });
}

// get weather on page load (location-based units)
$(document).ready(function () {
    getWeather("");

});

// Change units on toggle click
$('.btn-toggle').click(function () {
    $(this).find('.btn').toggleClass('active');

    if ($(this).find('.btn-primary').size() > 0) {
        $(this).find('.btn').toggleClass('btn-primary');

        if ($("#fahr").hasClass('active')) {
            getWeather("imperial");
        } else {
            getWeather("metric");
        }
    }
});