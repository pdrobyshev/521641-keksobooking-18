'use strict';

(function () {
  var ADVERTISEMENTS_AMOUNT = 8;
  var isMapActive = false;
  var pinCoords = {
    X: 570,
    Y: 375
  };

  var map = document.querySelector('.map');
  var mapPinsList = map.querySelector('.map__pins');
  var mapPin = mapPinsList.querySelector('.map__pin--main');
  var formElements = document.querySelectorAll('.ad-form__element');
  var filterElements = document.querySelectorAll('.map__filter');
  var adForm = document.querySelector('.ad-form');

  var generateAdvertisementsList = function (amount) {
    var advertisementsList = [];

    for (var i = 0; i < amount; i++) {
      var advertisement = window.data.generateAdvertisement(i);

      advertisementsList.push(advertisement);
    }

    return advertisementsList;
  };

  var activateMap = function () {
    isMapActive = true;

    window.utils.toggleFormElements(formElements, false);
    window.utils.toggleFormElements(filterElements, false);
    window.form.activate();

    mapPin.removeEventListener('keydown', activateMap);
    mapPin.removeEventListener('mousedown', activateMap);

    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    var advertisementsList = generateAdvertisementsList(ADVERTISEMENTS_AMOUNT);
    mapPinsList.appendChild(window.pin.render(advertisementsList, mapPinsList));
  };

  var getMapPinCoords = function () {
    var x = pinCoords.X + Math.round(mapPin.offsetWidth / 2);
    var y = !isMapActive ? pinCoords.Y + Math.round(mapPin.offsetHeight / 2) : pinCoords.Y + mapPin.offsetHeight;
    return 'x: ' + x + ' y: ' + y;
  };

  window.utils.toggleFormElements(formElements, true);
  window.utils.toggleFormElements(filterElements, true);

  mapPin.addEventListener('mousedown', activateMap);
  mapPin.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, activateMap);
  });

  window.map = {
    getPinCoords: getMapPinCoords
  };
})();
