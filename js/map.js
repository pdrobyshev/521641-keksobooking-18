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
  var rooms = document.querySelector('#room_number');

  var activateMap = function () {
    window.util.toggleFormElements(formElements, false);
    window.util.toggleFormElements(filterElements, false);
    isMapActive = true;
    window.form.setAddress();
    window.form.setPrice();
    window.form.compareRoomsToCapacity();
    var advertisementsList = window.data.generateAdvertisementsList(ADVERTISEMENTS_AMOUNT);
    mapPinsList.appendChild(window.pin.renderAll(advertisementsList, mapPinsList));
    rooms.addEventListener('change', window.form.compareRoomsToCapacity);
    mapPin.removeEventListener('keydown', activateMap);
    mapPin.removeEventListener('mousedown', activateMap);
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
  };

  var getMapPinCoords = function () {
    var x = pinCoords.X + Math.round(mapPin.offsetWidth / 2);
    var y = !isMapActive ? pinCoords.Y + Math.round(mapPin.offsetHeight / 2) : pinCoords.Y + mapPin.offsetHeight;
    return 'x: ' + x + ' y: ' + y;
  };

  window.util.toggleFormElements(formElements, true);
  window.util.toggleFormElements(filterElements, true);

  mapPin.addEventListener('mousedown', activateMap);
  mapPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, activateMap);
  });

  window.map = {
    mapPinsList: mapPinsList,
    getPinCoords: getMapPinCoords
  };
})();
