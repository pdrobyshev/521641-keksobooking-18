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
      window.card.showAd(advertisement);
    });
    pin.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, window.card.showAd, advertisement);
    });

    return pin;
  };

  var renderPins = function (advertisementsList) {
    var fragment = document.createDocumentFragment();

    advertisementsList.forEach(function (advertisement) {
      fragment.appendChild(generatePin(advertisement));
    });

    window.map.mapPinsList.appendChild(fragment);
  };

  window.pin = {
    renderAll: renderPins
  };
})();
