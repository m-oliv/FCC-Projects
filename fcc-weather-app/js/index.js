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
var ICON_TYPE_WEATHER = 'WEATHER';
var ICON_TYPE_WIND = 'WIND';
var BACKGROUND_IMAGES = {
    clearSky: {
        small: "",
        medium: "",
        large: "https://farm9.staticflickr.com/8660/16712341612_1acf44685c_o_d.jpg"
    },
    fog: {
        small: "",
        medium: "",
        large: "http://wallpaperus.org/wallpapers/05/205/dock-fog-1920x1080-wallpaper-874500.jpg"
    },
    sand: {
        small: "",
        medium: "",
        large: "https://pixabay.com/static/uploads/photo/2013/07/19/17/02/sandstorm-165332_960_720.jpg"
    },
    smoke: {
        small: "",
        medium: "",
        large: "https://farm6.staticflickr.com/5616/15425029170_4df04cc9c6_o_d.jpg"
    },
    volcanicAsh: {
        small: "",
        medium: "",
        large: "https://farm8.staticflickr.com/7457/12564894603_c4223656c9_b.jpg"
    },
    tornado: {
        small: "",
        medium: "",
        large: "https://farm6.staticflickr.com/5263/5741513041_c34398754f_o_d.jpg"
    },
    hurricane: {
        small: "",
        medium: "",
        large: "https://pixabay.com/static/uploads/photo/2015/11/18/17/38/hurricane-1049612_960_720.jpg"
    },
    cold: {
        small: "",
        medium: "",
        large: "https://pixabay.com/static/uploads/photo/2016/03/04/16/03/snowflakes-1236245_960_720.jpg"
    },
    hot: {
        small: "",
        medium: "",
        large: "https://farm4.staticflickr.com/3293/2657581054_ba86135d6b_o_d.jpg"
    },
    windy: {
        small: "",
        medium: "",
        large: "https://farm8.staticflickr.com/7256/7432830630_913c75cffc_o_d.jpg"
    },
    hail: {
        small: "",
        medium: "",
        large: "https://farm4.staticflickr.com/3156/2587411940_d1fa273bb9_o_d.jpg"
    },
    storm: {
        small: "",
        medium: "",
        large: "https://farm7.staticflickr.com/6086/6145122499_2dcdaa3483_o_d.jpg"
    },
    strongWinds: {
        small: "",
        medium: "",
        large: "https://farm8.staticflickr.com/7043/6882873263_cce47e6c2e_o_d.jpg"
    },
    thunderstorm: {
        small: "",
        medium: "",
        large: "https://static.pexels.com/photos/56614/lightning-storm-night-firebird-56614.jpeg"
    },
    drizzle: {
        small: "",
        medium: "",
        large: "https://static.pexels.com/photos/39811/pexels-photo-39811.jpeg"
    },
    rain: {
        small: "",
        medium: "",
        large: "https://static.pexels.com/photos/68084/pexels-photo-68084.jpeg"
    },
    snow: {
        small: "",
        medium: "",
        large: "https://static.pexels.com/photos/24378/pexels-photo-24378.jpg"
    },
    clouds: {
        small: "",
        medium: "",
        large: "https://static.pexels.com/photos/215/road-sky-clouds-cloudy.jpg"
    },
    breeze: {
        small: "",
        medium: "",
        large: "http://65.media.tumblr.com/1adc4029ef3a31124f222add70fa3553/tumblr_n2k1499dIp1st5lhmo1_1280.jpg"
    }
};

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

// get the correct sized background image
function getBackgroundImage(image) {
    if (window.innerWidth < 300) {
        $('body').css('background-image', "url(" + image.small + ")");
    } else if (window.innerWidth >= 300 && window.innerWidth < 600) {
        $('body').css('background-image', "url(" + image.medium + ")");
    } else {
        $('body').css('background-image', "url(" + image.large + ")");
    }
}

// get the correct wind direction icon
function getWindDirIcon(dir) {
    switch (dir) {
        case 'N':
            getIcon("wi wi-wind towards-0-deg", ICON_TYPE_WIND);
            document.getElementById('windDir').innerHTML = 'N';
            break;
        case 'NE':
            getIcon("wi wi-wind towards-45-deg",ICON_TYPE_WIND);
            document.getElementById('windDir').innerHTML = 'NE';
            break;
        case 'E':
            getIcon("wi wi-wind towards-90-deg",ICON_TYPE_WIND);
            document.getElementById('windDir').innerHTML = 'E';
            break;
        case 'SE':
            getIcon("wi wi-wind towards-135-deg",ICON_TYPE_WIND);
            document.getElementById('windDir').innerHTML = 'SE';
            break;
        case 'S':
            getIcon("wi wi-wind towards-180-deg",ICON_TYPE_WIND);
            document.getElementById('windDir').innerHTML = 'S';
            break;
        case 'SW':
            getIcon("wi wi-wind towards-225-deg", ICON_TYPE_WIND);
            document.getElementById('windDir').innerHTML = 'SW';
            break;
        case 'W':
            getIcon("wi wi-wind towards-270-deg", ICON_TYPE_WIND);
            document.getElementById('windDir').innerHTML = 'W';
            break;
        case 'NW':
            getIcon("wi wi-wind towards-313-deg", ICON_TYPE_WIND);
            document.getElementById('windDir').innerHTML = 'NW';
            break;
    }
}

function getIcon(iconType, type) {
    switch (type) {
        case 'WEATHER':
            var icon = document.createElement('i');
            icon.id = "weatherInfo";
            icon.innerHTML = "<i id =\"weatherIcon\" class = \"" + iconType + "\"></i>";
            document.getElementById("weatherInfo").insertBefore(icon, document.getElementById("weatherInfo").firstChild);
            break;
        case 'WIND':
            var icon = document.createElement('i');
            icon.id = 'windInfo';
            icon.innerHTML = "<i id =\"windIcon\" class = \"" + iconType + "\"></i>";
            document.getElementById('windInfo').insertBefore(icon, document.getElementById('windInfo').firstChild);
            break;
    }
}

// get icon and bg image, apply correct color config
function generateWeatherConfiguration(weatherID) {

    switch (weatherID) {
        // clear
        case 800:
        case 951:
            // icon : 
            getIcon("wi wi-day-sunny", ICON_TYPE_WEATHER);
            getBackgroundImage(BACKGROUND_IMAGES.clearSky);
            break;
            // mist / haze / fog
        case 701:
        case 721:
        case 741:
            getIcon("wi wi-fog", ICON_TYPE_WEATHER);
            getBackgroundImage(BACKGROUND_IMAGES.fog);
            $('#country').css('color', "white");
            $('#time').css('color', "white");
            allWhite();
            break;
            // sand 
        case 731:
        case 751:
        case 761:
            getIcon("wi wi-sandstorm", ICON_TYPE_WEATHER);
            getBackgroundImage(BACKGROUND_IMAGES.sand);
            break;
            // smoke
        case 711:
            getIcon("wi wi-smoke", ICON_TYPE_WEATHER);
            getBackgroundImage(BACKGROUND_IMAGES.smoke);
            $('#country').css('color', "white");
            $('#time').css('color', "white");
            allWhite();
            break;
            // volcanic ash
        case 762:
            getIcon("wi wi-volcano", ICON_TYPE_WEATHER);
            getBackgroundImage(BACKGROUND_IMAGES.volcanicAsh);
            break;
            // tornado
        case 781:
        case 900:
            getIcon("wi wi-tornado", ICON_TYPE_WEATHER);
            getBackgroundImage(BACKGROUND_IMAGES.tornado);
            $('#country').css('color', "white");
            $('#time').css('color', "white");
            allWhite();
            break;
            // tropical storm / hurricane
        case 901:
        case 902:
        case 962:
            getIcon("wi wi-hurricane", ICON_TYPE_WEATHER);
            getBackgroundImage(BACKGROUND_IMAGES.hurricane);
            break;
            // cold
        case 903:
            getIcon("wi wi-snowflake-cold", ICON_TYPE_WEATHER);
            getBackgroundImage(BACKGROUND_IMAGES.cold);
            break;
            // hot
        case 904:
            getIcon("wi wi-hot", ICON_TYPE_WEATHER);
            getBackgroundImage(BACKGROUND_IMAGES.hot);
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
            getIcon("wi wi-windy", ICON_TYPE_WEATHER);
            getBackgroundImage(BACKGROUND_IMAGES.windy);
            $('#country').css('color', "white");
            $('#time').css('color', "white");
            allWhite();
            break;
            // hail
        case 906:
            getIcon("wi wi-hail", ICON_TYPE_WEATHER);
            getBackgroundImage(BACKGROUND_IMAGES.hail);
            $('#country').css('color', "white");
            $('#time').css('color', "white");
            allWhite();
            break;
            // storm
        case 960:
        case 961:
            getIcon("wi wi-storm-showers", ICON_TYPE_WEATHER);
            getBackgroundImage(BACKGROUND_IMAGES.storm);
            $('#country').css('color', "white");
            $('#time').css('color', "white");
            allWhite();
            break;
            // strong winds
        case 957:
        case 958:
        case 959:
            getIcon("wi wi-strong-wind", ICON_TYPE_WEATHER);
            getBackgroundImage(BACKGROUND_IMAGES.strongWinds);
            $('#country').css('color', "white");
            $('#time').css('color', "white");
            allWhite();
            $('#windDir').css('color', "black");
            $('#windIcon').css('color', "black");
            $('#windSpeed').css('color', "black");
            break;
    }

    if (weatherID >= 200 && weatherID < 233) { // thunderstorm
        getIcon("wi wi-thunderstorm", ICON_TYPE_WEATHER);
        getBackgroundImage(BACKGROUND_IMAGES.thunderstorm);
        $('#country').css('color', "white");
        $('#time').css('color', "white");
        allWhite();
    } else if (weatherID >= 300 && weatherID < 322) { // drizzle
        getIcon("wi wi-raindrops", ICON_TYPE_WEATHER);
        getBackgroundImage(BACKGROUND_IMAGES.drizzle);
        $('#country').css('color', "white");
        $('#time').css('color', "white");
        allWhite();
    } else if (weatherID >= 500 && weatherID < 532) { // rain
        getIcon("wi wi-rain", ICON_TYPE_WEATHER);
        getBackgroundImage(BACKGROUND_IMAGES.rain);
        $('#country').css('color', "white");
        $('#time').css('color', "white");
        allWhite();
    } else if (weatherID >= 600 && weatherID < 623) { // snow
        getIcon("wi wi-snow", ICON_TYPE_WEATHER);
        getBackgroundImage(BACKGROUND_IMAGES.snow);
        $('h1').css('color', "white");
        $('#weatherIcon').css('color', "white");
        $('#weatherIcon, #temp, #wid').css('color', "white");
    } else if ((weatherID >= 801 && weatherID < 805) || weatherID === 771) { // clouds / squalls
        getIcon("wi wi-cloudy", ICON_TYPE_WEATHER);
        getBackgroundImage(BACKGROUND_IMAGES.clouds);
        $('#country').css('color', "white");
        $('#time').css('color', "white");
    } else if (weatherID >= 952 && weatherID < 955) { // light / gentle /  moderate breeze
        getIcon("wi wi-windy", ICON_TYPE_WEATHER);
        getBackgroundImage(BACKGROUND_IMAGES.breeze);
        $('#country').css('color', "white");
        $('#time').css('color', "white");
        allWhite();
    }

}

// get current time (HH:MM)
function getCurrentTime() {
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
                getWindDirIcon(getWindDir(data.wind.deg));
            } else {
                getWindDirIcon(getWindDir(data.wind.deg));
            }

            // apply weather icon / bg / color config
            if (document.contains(document.getElementById('weatherIcon'))) {
                document.getElementById('weatherIcon').remove();
                generateWeatherConfiguration(data.weather[0].id);
            } else {
                generateWeatherConfiguration(data.weather[0].id);
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