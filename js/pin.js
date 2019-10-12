'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var generatePin = function (advertisement) {
    var pin = pinTemplate.cloneNode(true);

    pin.style.left = advertisement.location.x + 'px';
    pin.style.top = advertisement.location.y + 'px';
    pin.querySelector('img').src = advertisement.author.avatar;
    pin.querySelector('img').alt = advertisement.offer.title;

    pin.addEventListener('click', function () {
      window.card.show(advertisement);
    });
    pin.addEventListener('keydown', function (evt) {
      window.utils.isEnterEvent(evt, window.card.show, advertisement);
    });

    return pin;
  };

  var renderPins = function (advertisementsList) {
    var fragment = document.createDocumentFragment();

    advertisementsList.forEach(function (advertisement) {
      fragment.appendChild(generatePin(advertisement));
    });

    return fragment;
  };

  window.pin = {
    renderAll: renderPins
  };
})();
