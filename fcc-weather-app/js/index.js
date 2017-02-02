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
        small: "https://dl.dropbox.com/s/21xazy4qqb79jx2/clear-sky-small.png?dl=0",
        medium: "https://dl.dropbox.com/s/hcxalrlabppin87/clear-sky-medium.png?dl=0",
        large: "https://dl.dropbox.com/s/lal6ogf7tasm4gs/clear-sky-large.png?dl=0"
    },
    fog: {
        small: "https://dl.dropbox.com/s/l39cuesv4wts460/fog-small.png?dl=0",
        medium: "https://dl.dropbox.com/s/r50ykwogitu8tw1/fog-medium.png?dl=0",
        large: "https://dl.dropbox.com/s/bb72lp3154nw4py/fog-large.png?dl=0"
    },
    sand: {
        small: "https://dl.dropbox.com/s/y92qd60ifdbkahd/sand-small.png?dl=0",
        medium: "https://dl.dropbox.com/s/s5m656v1a8pyt5j/sand-medium.png?dl=0",
        large: "https://dl.dropbox.com/s/ajx36dlxa9i0tga/sand-large.png?dl=0"
    },
    smoke: {
        small: "https://dl.dropbox.com/s/okut2ixfsilcqmf/smoke-small.png?dl=0",
        medium: "https://dl.dropbox.com/s/7jvsh0vww9gj4o4/smoke-medium.png?dl=0",
        large: "https://dl.dropbox.com/s/m9np9vqtvz3x0q6/smoke-large.png?dl=0"
    },
    volcanicAsh: {
        small: "https://dl.dropbox.com/s/jh047z9gezht90s/volcanicash-small.png?dl=0",
        medium: "https://dl.dropbox.com/s/o85iki84notiwla/volcanicash-medium.png?dl=0",
        large: "https://dl.dropbox.com/s/8ewjbgl6n56nsrp/volcanicash-large.png?dl=0"
    },
    tornado: {
        small: "https://dl.dropbox.com/s/vei71rai242n9wb/tornado-small.png?dl=0",
        medium: "https://dl.dropbox.com/s/o9qaqmkak0dd4os/tornado-medium.png?dl=0",
        large: "https://dl.dropbox.com/s/4q9rqhwiy9fsl70/tornado-large.png?dl=0"
    },
    hurricane: {
        small: "https://dl.dropbox.com/s/m40u20pxu0mbr7z/hurricane-small.png?dl=0",
        medium: "https://dl.dropbox.com/s/k83op5dv5quoio6/hurricane-medium.png?dl=0",
        large: "https://dl.dropbox.com/s/spop4lxyvc4gjxj/hurricane-large.png?dl=0"
    },
    cold: {
        small: "https://dl.dropbox.com/s/izisroq1qfcu4wb/cold-small.png?dl=0",
        medium: "https://dl.dropbox.com/s/qmzaxnti8jjoplk/cold-medium.png?dl=0",
        large: "https://dl.dropbox.com/s/i4rttftcwnzhe8k/cold-large.png?dl=0"
    },
    hot: {
        small: "https://dl.dropbox.com/s/irvpk1ymybrpxns/hot-small.png?dl=0",
        medium: "https://dl.dropbox.com/s/g7t2fjgz0h5bamm/hot-medium.png?dl=0",
        large: "https://dl.dropbox.com/s/x4v1lc7p801ys5s/hot-large.png?dl=0"
    },
    windy: {
        small: "https://dl.dropbox.com/s/q502knzlry1xz3w/wind-small.png?dl=0",
        medium: "https://dl.dropbox.com/s/c16zvqhi2wntn3p/wind-medium.png?dl=0",
        large: "https://dl.dropbox.com/s/0qnomqzw5i06od6/wind-large.png?dl=0"
    },
    hail: {
        small: "https://dl.dropbox.com/s/nkmli3f2ihdbttc/hail-small.png?dl=0",
        medium: "https://dl.dropbox.com/s/jsab55mheb8oxub/hail-medium.png?dl=0",
        large: "https://dl.dropbox.com/s/cm0stgyfz2zwmc5/hail-large.png?dl=0"
    },
    storm: {
        small: "https://dl.dropbox.com/s/y5i10u53jwq5r7f/storm-small.png?dl=0",
        medium: "https://dl.dropbox.com/s/svgtwcvdg7q4a5q/storm-medium.png?dl=0",
        large: "https://dl.dropbox.com/s/7psmanl4528tg7a/storm-large.png?dl=0"
    },
    strongWinds: {
        small: "https://dl.dropbox.com/s/jtjpukn1790aexd/strongwinds-small.png?dl=0",
        medium: "https://dl.dropbox.com/s/2dcik6cf00h9bbi/strongwinds-medium.png?dl=0",
        large: "https://dl.dropbox.com/s/w5olyf8adg83qzg/strongwinds-large.png?dl=0"
    },
    thunderstorm: {
        small: "https://dl.dropbox.com/s/hsis4j4px87ihla/thunderstorms-small.png?dl=0",
        medium: "https://dl.dropbox.com/s/s8qhwvcix2y139u/thunderstorms-medium.png?dl=0",
        large: "https://dl.dropbox.com/s/ghrqujkc369y389/thunderstorms-large.png?dl=0"
    },
    drizzle: {
        small: "https://dl.dropbox.com/s/3k2c1n8u2zxmhaj/drizzle-small.png?dl=0",
        medium: "https://dl.dropbox.com/s/fttk2pj2fixi2oa/drizzle-medium.png?dl=0",
        large: "https://dl.dropbox.com/s/2cplyqbo4reysjm/drizzle-large.png?dl=0"
    },
    rain: {
        small: "https://dl.dropbox.com/s/kpvf6r15au1dfxp/rain-small.png?dl=0",
        medium: "https://dl.dropbox.com/s/fml1kpsmsgzxkm0/rain-medium.png?dl=0",
        large: "https://dl.dropbox.com/s/uy8iz28py0xszd5/rain-large.png?dl=0"
    },
    snow: {
        small: "https://dl.dropbox.com/s/1s95ld0gy3uukx8/snow-small.png?dl=0",
        medium: "https://dl.dropbox.com/s/et61611zeejnj5q/snow-medium.png?dl=0",
        large: "https://dl.dropbox.com/s/62htdzsw9mh6k8i/snow-large.png?dl=0"
    },
    clouds: {
        small: "https://dl.dropbox.com/s/1espkbrhvf5g5pv/clouds-small.png?dl=0",
        medium: "https://dl.dropbox.com/s/47a4u2cpxdmb6ip/clouds-medium.png?dl=0",
        large: "https://dl.dropbox.com/s/cdtowmxz4w3veya/clouds-large.png?dl=0"
    },
    breeze: {
        small: "https://dl.dropbox.com/s/m2eozrbpolcm6tn/breeze-small.png?dl=0",
        medium: "https://dl.dropbox.com/s/h2i7zwnk9q8yapk/breeze-medium.png?dl=0",
        large: "https://dl.dropbox.com/s/luaaqsd36z68wox/breeze-large.png?dl=0"
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
    if (window.innerWidth < 768) {
        $('body').css('background-image', "url(" + image.small + ")");
    } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
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
        s = s1.split(" "), i, len = s.length;

    for (i = 0; i < len; i++) {
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
            getWeather(IMPERIAL_UNITS);
        } else {
            getWeather(METRIC_UNITS);
        }
    }
});