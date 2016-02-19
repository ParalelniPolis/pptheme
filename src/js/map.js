(function(window, document, PP) {
    PP.map = function() {
        if(PP.DEFAULTS.mapResponsiveWidth < PP.ENVIROMENT.actualWindowWidth ) {
            loadDynamicMap();
        }
        else {
            loadStaticMap();
        }
    }

    var mapElement = document.getElementById('js-map');

    var loadStaticMap = function() {
        var mapLink = document.createElement('a');
        var imageUrl = 'dist/images/static-map.png'
        var image = new Image();

        mapLink.target = '_blank';
        mapLink.href = 'https://www.google.cz/maps/place/Paraleln%C3%AD+Polis/@50.1033489,14.4483076,17z/data=!3m1!4b1!4m2!3m1!1s0x470b94b187ba58ef:0xd578dd7938e0fb87';
        image.src = imageUrl;
        image.onload = function() {
            mapLink.style.backgroundImage = 'url(' + imageUrl + ')';
            mapLink.style.opacity = 0;
            mapLink.className = 'map__static';
            mapElement.appendChild(mapLink);
            PP.fadeIn(mapLink);
        }
    }
    var loadDynamicMap = function() {
        var scriptElement = document.createElement('script');

        scriptElement.onload = function() {
            initDynamicMap();
        }
        scriptElement.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBm5Mwi6QjhQnNbwGlFmSLGiPoev6GK6Xk';

        document.head.appendChild(scriptElement);
    }
    var initDynamicMap = function() {
        var infoWIndowContent = '<div class="map__window"><p><strong>Paralelní Polis</strong><br>Dělnická 43<br>Praha 7<br><a href="mailto:info@paralelnipolis.cz">info@paralelnipolis.cz</a><br><a href="https://www.google.cz/maps/place/Paraleln%C3%AD+Polis/@50.1033489,14.4483076,17z/data=!3m1!4b1!4m2!3m1!1s0x470b94b187ba58ef:0xd578dd7938e0fb87" target="_blank">Otevřit v Google Maps</a></p></div>'
        var position = new google.maps.LatLng(50.103419, 14.450491);
        var map = new google.maps.Map(mapElement, {
            center: position,
            scrollwheel: false,
            panControl: false,
            draggable: false,
            streetViewControl: false,
            mapTypeControl: false,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL
            },
            zoom: 15,
            styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
        });
        var marker = new google.maps.Marker({
            position: position,
            map: map,
            icon: 'wp-content/themes/pptheme/dist/images/map-logo.png'
        });
        var infoWindow = new google.maps.InfoWindow({
                content: infoWIndowContent
            });
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(map, marker);
        });
    }

    PP.map();
})(window, document, window.PP = window.PP || {})
