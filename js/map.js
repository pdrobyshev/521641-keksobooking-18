'use strict';

(function () {
  var ADVERTISEMENTS_AMOUNT = 8;
  var isMapActive = false;
  var map = document.querySelector('.map');
  var mapPinsList = map.querySelector('.map__pins');
  var mapPin = mapPinsList.querySelector('.map__pin--main');

  var activateMap = function () {
    window.form.toggleElements(window.form.formElements, false);
    window.form.toggleElements(window.form.filterElements, false);
    isMapActive = true;
    window.form.setAddress();
    window.form.setPrice();
    window.form.compareRoomsToCapacity();
    var advertisementsList = window.data.generateAdvertisementsList(ADVERTISEMENTS_AMOUNT);
    window.pin.renderAll(advertisementsList);
    window.form.rooms.addEventListener('change', window.form.compareRoomsToCapacity);
    mapPin.removeEventListener('keydown', activateMap);
    mapPin.removeEventListener('mousedown', activateMap);
    map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
  };

  mapPin.addEventListener('mousedown', activateMap);
  mapPin.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, activateMap);
  });

  window.map = {
    map: map,
    mapPin: mapPin,
    mapPinsList: mapPinsList,
    isMapActive: isMapActive
  };
})();
