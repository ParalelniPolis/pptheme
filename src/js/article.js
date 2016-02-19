(function(window, document, PP) {
    PP.article = function() {
        var articleElements = document.getElementsByClassName('article__image');
        Array.prototype.forEach.call(articleElements, function(element, i) {
            var imageUrl = element.getAttribute('data-image');
            var image = new Image();

            image.src = imageUrl;
            image.onload = function() {
                element.style.backgroundImage = 'url(' + imageUrl + ')';
                element.classList.add('article__image--loaded');
            }
        });
    }

    PP.article();
})(window, document, window.PP = window.PP || {})
