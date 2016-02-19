(function(window, document, PP) {
    var activeSlide = 0;
    var citationParent = document.getElementById('js-citation');
    var citationDots = document.getElementById('js-citation__dots');
    var citationContainer = document.querySelector('.citation__container');
    var citationElements = document.getElementsByClassName('citation__slide');
    var interval = 5000;
    var rotateInterval;
    var maxHeight = 0;

    PP.citation = function() {
        getMaxHeight();
        addDots();
        applyInterval();
    }

    var getMaxHeight = function() {
        Array.prototype.forEach.call(citationElements, function(element, index) {
            if(element.clientHeight > maxHeight) {
                maxHeight = element.clientHeight;
            }
        });

        citationContainer.style.height = maxHeight + 'px';
    }

    var clickDot = function(dot) {
        document.querySelector('.citation__slide--active').classList.remove('citation__slide--active');
        document.querySelector('.citation__dot--active').classList.remove('citation__dot--active');
        citationElements[dot.getAttribute('data-slide')].classList.add('citation__slide--active');
        citationDots.children[dot.getAttribute('data-slide')].classList.add('citation__dot--active');
    }

    var addDots = function() {
        for(var i = 0; i < citationElements.length; i++) {
            var dot = document.createElement('a');

            dot.classList.add('citation__dot');
            dot.setAttribute('data-slide', i);
            dot.href = 'javascript:void(0)';
            dot.onclick = function() {
                clickDot(this);
            }
            if(i==0) {
                dot.classList.add('citation__dot--active');
            }

            citationDots.appendChild(dot);
        }
    }

    var applyInterval = function() {
        rotateInterval = setInterval(function() {
            rotateCitation();
        }, interval);
    }

    var rotateCitation = function() {
        Array.prototype.forEach.call(citationElements, function(element, index) {
            if(element.classList.contains('citation__slide--active')) {
                activeSlide = index;
            }
        });

        citationElements[activeSlide].classList.remove('citation__slide--active');
        citationDots.children[activeSlide].classList.remove('citation__dot--active');

        if(activeSlide == citationElements.length - 1) {
            citationElements[0].classList.add('citation__slide--active');
            citationDots.children[0].classList.add('citation__dot--active');
        }
        else {
            citationElements[activeSlide + 1].classList.add('citation__slide--active');
            citationDots.children[activeSlide + 1].classList.add('citation__dot--active');
        }
    }

    if (citationParent !== null) {
        citationParent.addEventListener('mouseover', function(event) {
            clearInterval(rotateInterval);
        }, false);

        citationParent.addEventListener('mouseout', function(event) {
            applyInterval();
        }, false);

        window.addEventListener('resize', function(event) {
            maxHeight = 0;
            getMaxHeight();
        }, false);

        PP.citation();
    }
})(window, document, window.PP = window.PP || {})
