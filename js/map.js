'use strict';

(function () {
  var activateMap = function () {
    toggleFormElements(formElements, false);
    toggleFormElements(filterElements, false);
    isMapActive = true;
    setAddress();
    setPrice();
    compareRoomsToCapacity();
    var advertisementsList = generateAdvertisementsList(ADVERTISEMENTS_AMOUNT);
    renderPins(advertisementsList);
    rooms.addEventListener('change', compareRoomsToCapacity);
    mapPin.removeEventListener('keydown', activateMap);
    mapPin.removeEventListener('mousedown', activateMap);
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
  };
})();
