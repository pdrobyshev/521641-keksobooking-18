'use strict';

(function () {
  var generatePin = function (advertisement) {
    var pin = pinTemplate.cloneNode(true);

    pin.style.left = advertisement.location.x + 'px';
    pin.style.top = advertisement.location.y + 'px';
    pin.querySelector('img').src = advertisement.author.avatar;
    pin.querySelector('img').alt = advertisement.offer.title;

    pin.addEventListener('click', function () {
      showAdCard(advertisement);
    });
    pin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === keycodes.ENTER) {
        showAdCard(advertisement);
      }
    });

    return pin;
  };

  var renderPins = function (advertisementsList) {
    var fragment = document.createDocumentFragment();

    advertisementsList.forEach(function (advertisement) {
      fragment.appendChild(generatePin(advertisement));
    });

    mapPinsList.appendChild(fragment);
  };
})();
