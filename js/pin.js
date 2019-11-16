'use strict';

(function () {
  var pinParams = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var removeActiveClass = function (pin) {
    var pins = document.querySelectorAll('.map__pin[type="button"]');

    pins.forEach(function (pinEl) {
      pinEl.classList.remove('map__pin--active');
    });

    if (pin) {
      pin.classList.add('map__pin--active');
    }
  };

  var onPinClick = function (pin) {
    removeActiveClass(pin);
  };

  var generatePin = function (advertisement) {
    var pin = pinTemplate.cloneNode(true);

    pin.style.left = advertisement.location.x - pinParams.WIDTH / 2 + 'px';
    pin.style.top = advertisement.location.y - pinParams.HEIGHT + 'px';
    pin.querySelector('img').src = advertisement.author.avatar;
    pin.querySelector('img').alt = advertisement.offer.title;

    pin.addEventListener('click', function () {
      onPinClick(pin);
      window.card.show(advertisement);
    });

    pin.addEventListener('keydown', function (evt) {
      onPinClick(pin);
      window.utils.isEnterEvent(evt, window.card.show, advertisement);
    });

    return pin;
  };

  window.pin = {
    generate: generatePin,
    removeActiveClass: removeActiveClass
  };
})();
