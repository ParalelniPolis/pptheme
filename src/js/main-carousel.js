(function(window, document, PP) {
    var carouselElement = document.getElementById('js-main-carousel');
    var carouselDots = document.getElementById('js-carousel-dots');
    var carouselInner = document.getElementById('js-main-carousel-inner');
    var carouselElements = document.getElementsByClassName('main-carousel__item');
    var interval = 8000;
    var rotateInterval;

    PP.mainCarousel = function() {

        setCarouselInnerWidth();
        addDots();
        applyInterval();
        carouselHeight();

        Array.prototype.forEach.call(carouselElements, function(element, i) {
            var imageUrl = element.getAttribute('data-image');
            var image = new Image();

            image.src = imageUrl;
            image.onload = function() {
                element.style.backgroundImage = 'url(' + imageUrl + ')';
                element.classList.add('main-carousel__item--loaded');
            }
        });
    }

    var setCarouselInnerWidth = function() {
        var size = carouselElements.length * 100;

        carouselInner.style.width = size + 'vw';
    }

    var applyInterval = function() {
        rotateInterval = setInterval(function() {
            rotateSlide();
        }, interval);
    }

    var removeInterval = function() {
        clearInterval(rotateInterval);
    }

    var clickDot = function(dot) {
        removeInterval();

        rotateSlide(dot.getAttribute('data-slide'));

        applyInterval();
    }

    var addDots = function() {
        for(var i = 0; i < carouselElements.length; i++) {
            var dot = document.createElement('a');

            dot.classList.add('main-carousel__dot');
            dot.setAttribute('data-slide', i);
            dot.href = 'javascript:void(0)';
            dot.onclick = function() {
                clickDot(this);
            }
            if(i==0) {
                dot.classList.add('main-carousel__dot--active');
            }

            carouselDots.appendChild(dot);
        }
    }

    var rotateSlide = function(slide) {
        if (typeof slide !== 'undefined') {
            var activeSlide = parseInt(slide);
        }
        else {
            var activeSlide = carouselInner.getAttribute('data-slide');
            activeSlide = parseInt(activeSlide);

            if (activeSlide == carouselElements.length - 1) {
                activeSlide = 0;
            }
            else {
                activeSlide++;
            }
        }

        var transformOffset = activeSlide * 100;

        carouselInner.style.transform = 'translate(-' + transformOffset + 'vw)';
        carouselInner.setAttribute('data-slide', activeSlide);
        document.querySelector('.main-carousel__dot--active').classList.remove('main-carousel__dot--active');
        carouselDots.children[activeSlide].classList.add('main-carousel__dot--active');
    }

    var carouselHeight = function() {
        carouselElement.style.height = window.innerHeight + 'px';
    }

    if (carouselElement !== null) {
        PP.mainCarousel();
    }
})(window, document, window.PP = window.PP || {})
