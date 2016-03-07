(function(window, document, PP) {
    PP.lightbox = function() {
        var lightboxElements = document.querySelectorAll('.gallery-item a');

        if(lightboxElements.length > 0) {
            initLightbox();
        }

        Array.prototype.forEach.call(lightboxElements, function(element, i) {
            element.onclick = function(event) {
                event.preventDefault();
                openLightbox(this);
            }
        });
    }

    var initLightbox = function() {
        PP.lightbox.overlay = document.createElement('div');
        PP.lightbox.lightboxWrap = document.createElement('div');
        PP.lightbox.lightboxLoader  = document.createElement('div');
        PP.lightbox.closeModal = document.createElement('a');

        PP.lightbox.overlay.className = 'lightbox-overlay';
        PP.lightbox.lightboxLoader.className = 'lightbox-loader';
        PP.lightbox.closeModal.className = 'lightbox-close';

        PP.lightbox.closeModal.href = 'javascript:void(0)';

        PP.lightbox.overlay.onclick = function() {
            closeLightbox();
        }
        PP.lightbox.closeModal.onclick = function() {
            closeLightbox();
        }

        document.body.appendChild(PP.lightbox.closeModal);

        document.body.appendChild(PP.lightbox.overlay);
        document.body.appendChild(PP.lightbox.lightboxLoader);
    }

    var openLightbox = function(lightboxItem) {
        PP.lightbox.image = new Image();

        PP.lightbox.overlay.classList.add('lightbox-overlay--open');
        PP.lightbox.closeModal.classList.add('lightbox-close--open');
        PP.lightbox.lightboxLoader.classList.add('lightbox-loader--open');

        PP.lightbox.image.src = lightboxItem.getAttribute('href');
        PP.lightbox.image.className = 'lightbox-image';
        PP.lightbox.image.onload = function() {
            PP.lightbox.lightboxLoader.classList.remove('lightbox-loader--open');

            document.body.appendChild(PP.lightbox.image);
        }
    }

    var closeLightbox = function() {
        PP.lightbox.overlay.classList.remove('lightbox-overlay--open');
        PP.lightbox.closeModal.classList.remove('lightbox-close--open');
        PP.lightbox.lightboxLoader.classList.remove('lightbox-loader--open');

        document.body.removeChild(PP.lightbox.image);
    }

    PP.lightbox();
})(window, document, window.PP = window.PP || {})
