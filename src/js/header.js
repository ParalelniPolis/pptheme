(function(window, document, PP) {
    var headerElement = document.getElementById('js-header');
    var isTransparent = headerElement.classList.contains('header--transparent');

    PP.header = function() {
        document.addEventListener('scroll', function() {
            if(PP.DEFAULTS.menuResponsiveWidth < PP.ENVIROMENT.actualWindowWidth && isTransparent) {
                if(PP.scrollTop() > 10) {
                    headerElement.classList.remove('header--transparent');
                }
                else {
                    headerElement.classList.add('header--transparent');
                }
            }
        }, false);
    }

    document.addEventListener('click', function(event) {
        var clickedItem = event.target;
        var activeItem = document.querySelector('.header__navigation-item-link.is--active');

        if(clickedItem.parentElement.classList.contains('header__subnavigation') || window.innerWidth > 1210) {
            return true;
        }

        if(clickedItem == activeItem || activeItem !== null) {
            activeItem.classList.remove('is--active');
        }

        if (clickedItem.classList.contains('header__navigation-item-link') && clickedItem.parentElement.classList.contains('header__navigation-item--with-subnavigation')) {

            if (clickedItem !== activeItem) {
                event.preventDefault();
                clickedItem.classList.add('is--active');
            }
        }
    }, false);

    if (headerElement !== null) {
        PP.header();
    }
})(window, document, window.PP = window.PP || {})
