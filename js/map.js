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

  mapPin.addEventListener('mousedown', function (evt) {
    if (map.classList.contains('map--faded')) {
      activateMap();
    }

    evt.preventDefault();
    var dragged = false;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPin.style.top = (mapPin.offsetTop - shift.y) + 'px';
      mapPin.style.left = (mapPin.offsetLeft - shift.x) + 'px';

      var pinStyleTop = parseInt(mapPin.style.top, 10);
      var pinStyleLeft = parseInt(mapPin.style.left, 10);

      if (pinStyleTop < window.data.pinParams.MIN_Y) {
        mapPin.style.top = window.data.pinParams.MIN_Y + 'px';
      } else if (pinStyleTop > window.data.pinParams.MAX_Y) {
        mapPin.style.top = window.data.pinParams.MAX_Y + 'px';
      }

      if (pinStyleLeft < window.data.pinParams.MIN_X) {
        mapPin.style.left = window.data.pinParams.MIN_X - Math.round(window.map.mapPin.offsetWidth / 2) + 'px';
      } else if (pinStyleLeft > window.data.pinParams.MAX_X) {
        mapPin.style.left = window.data.pinParams.MAX_X + 'px';
      }

      window.form.setAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (ev) {
          ev.preventDefault();
          mapPin.removeEventListener('click', onClickPreventDefault);
        };
        mapPin.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

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
