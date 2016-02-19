(function(window, document, PP) {
    PP.hero = function() {
        var heroElements = document.getElementsByClassName('hero__item');
        Array.prototype.forEach.call(heroElements, function(element, i) {
            var imageUrl = element.getAttribute('data-image');
            var image = new Image();

            image.src = imageUrl;
            image.onload = function() {
                element.style.backgroundImage = 'url(' + imageUrl + ')';
                element.classList.add('hero__item--loaded');
            }
        });
    }

    PP.hero();
})(window, document, window.PP = window.PP || {})
