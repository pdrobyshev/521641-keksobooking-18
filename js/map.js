'use strict';

(function () {
  var isMapActive = false;
  var map = document.querySelector('.map');
  var mapPinsList = map.querySelector('.map__pins');
  var mapPin = mapPinsList.querySelector('.map__pin--main');

  var activateMap = function () {
    window.form.toggleFormElements(window.form.formElements, false);
    window.form.toggleFormElements(window.form.filterElements, false);
    isMapActive = true;
    window.form.setAddress();
    window.form.setPrice();
    window.form.compareRoomsToCapacity();
    var advertisementsList = window.data.generateAdvertisementsList(window.data.ADVERTISEMENTS_AMOUNT);
    window.pin.renderPins(advertisementsList);
    window.form.rooms.addEventListener('change', window.form.compareRoomsToCapacity);
    mapPin.removeEventListener('keydown', activateMap);
    mapPin.removeEventListener('mousedown', activateMap);
    map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
  };

  mapPin.addEventListener('mousedown', activateMap);
  mapPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ENTER) {
      activateMap();
    }
  });

  window.map = {
    map: map,
    mapPin: mapPin,
    mapPinsList: mapPinsList,
    isMapActive: isMapActive
  };
})();
