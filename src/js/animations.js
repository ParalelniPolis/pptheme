(function(window, document, PP) {
    PP.fadeIn = function(element, duration, callback) {
        if (element !== null) {
            var duration = duration || 400;
            element.style.opacity = 0;

            var last = +new Date();
            var tick = function() {
                element.style.opacity = +element.style.opacity + (new Date() - last) / duration;
                last = +new Date();

                if (+element.style.opacity < 1) {
                    (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
                }
                else {
                    if (typeof callback === 'function') {
                        callback();
                    }
                }
            };

            tick();
        }
    }
    PP.fadeOut = function(element, duration, callback) {
        if (element !== null) {
            var duration = duration || 400;
            element.style.opacity = 1;

            var last = +new Date();
            var tick = function() {
                element.style.opacity = +element.style.opacity - (new Date() - last) / duration;
                last = +new Date();

                if (+element.style.opacity > 0) {
                    (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
                }
                else {
                    if (typeof callback === 'function') {
                        callback();
                    }
                }
            };

            tick();
        }
    }
})(window, document, window.PP = window.PP || {})
