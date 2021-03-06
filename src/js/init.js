'use strict';

(function(window, document, PP) {

    // PUBLIC STUFF

    PP.ENVIROMENT = {}

    PP.ENVIROMENT.siteUrl = document.getElementById('siteUrl').value;

    PP.DEFAULTS = {
        menuResponsiveWidth : 1040,
        mapResponsiveWidth : 800,
        calendarApiUrl : PP.ENVIROMENT.siteUrl + '/wp-content/themes/pptheme/fbevents.php'
    }

    PP.scrollTop = function() {
        return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    }

    PP.callEvent = function(eventName, eventTarget) {
        var event = document.createEvent('HTMLEvents');

        event.initEvent(eventName, true, false);
        eventTarget.dispatchEvent(event);
    }

    // PRIVATE STUFF
    var saveWindowWidth = function() {
        var bodyElement = document.body;
        var pxWidth = window.getComputedStyle(bodyElement, null).getPropertyValue("width").replace('px', '');

        PP.ENVIROMENT.actualWindowWidth = parseInt(pxWidth);
    }

    window.addEventListener('resize', saveWindowWidth, false);
    PP.callEvent('resize', window);
})(window, document, window.PP = window.PP || {})
