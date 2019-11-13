'use strict';

(function () {
  var isMapActive = false;
  var pinCoords = {
    X: 570,
    Y: 375,
    MIN_X: 0,
    MAX_X: 1200,
    MIN_Y: 130,
    MAX_Y: 630,
  };
  var mainPinParams = {
    HALF_WIDTH: 33,
    HALF_HEIGHT: 33,
    HEIGHT: 81
  };
  var MAX_PINS = 5;
  var currentPins = [];

  var main = document.querySelector('main');
  var map = document.querySelector('.map');
  var mapPinsList = map.querySelector('.map__pins');
  var mapPin = mapPinsList.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormAddress = document.querySelector('input[name="address"]');
  var adFormResetButton = document.querySelector('.ad-form__reset');
  var mapFilters = document.querySelector('.map__filters');
  var avatar = document.querySelector('.ad-form-header__preview img');
  var housingPhotoBlock = document.querySelector('.ad-form__photo');

  var getMapPinCoords = function () {
    var pinStyleLeft = parseInt(mapPin.style.left, 10);
    var pinStyleTop = parseInt(mapPin.style.top, 10);

    var x = pinStyleLeft + mainPinParams.HALF_WIDTH;
    var y = !isMapActive ? pinStyleTop + mainPinParams.HALF_HEIGHT : pinStyleTop + mainPinParams.HEIGHT;
    return 'x: ' + x + ' y: ' + y;
  };

  var initialMainPinCoords = getMapPinCoords();

  var setAddress = function () {
    adFormAddress.value = getMapPinCoords();
  };

  var setInitialMainPinCoords = function () {
    mapPin.style.left = pinCoords.X + 'px';
    mapPin.style.top = pinCoords.Y + 'px';
    adFormAddress.value = initialMainPinCoords;
  };

  var deleteAllPins = function () {
    if (currentPins) {
      currentPins.forEach(function (pin) {
        pin.remove();
      });
    }
  };

  var generatePinsFragment = function (advertisementsList) {
    var fragment = document.createDocumentFragment();

    advertisementsList.forEach(function (advertisement) {
      var pin = window.generatePin(advertisement);
      currentPins.push(pin);
      fragment.appendChild(pin);
    });

    return fragment;
  };

  var filterFormChangeHandler = window.debounce(function (data) {
    deleteAllPins();
    window.card.remove();
    appendPins(data);
  });

  var appendPins = function (pins) {
    var filteredPins = window.filter(pins).slice(0, MAX_PINS);
    var pinsFragment = generatePinsFragment(filteredPins);
    mapPinsList.appendChild(pinsFragment);
  };

  var activateMap = function () {
    isMapActive = true;

    window.form.toggleAllElements(false);
    setAddress();
    window.form.activate();

    mapPin.removeEventListener('keydown', activateMap);
    mapPin.removeEventListener('mousedown', activateMap);

    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    window.backend.load(successHandler, errorHandler);
  };

  var deactivateMap = function () {
    mapFilters.reset();
    adForm.reset();
    window.card.remove();
    deleteAllPins();
    setInitialMainPinCoords();
    window.form.toggleAllElements(true);
    adForm.classList.add('ad-form--disabled');
    map.classList.add('map--faded');
    avatar.src = 'img/muffin-grey.svg';
    housingPhotoBlock.innerHTML = '';
  };

  var successHandler = function (data) {
    appendPins(data);

    mapFilters.addEventListener('change', function () {
      filterFormChangeHandler(data);
    });
  };

  var errorHandler = function (message) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var error = errorTemplate.cloneNode(true);

    error.querySelector('.error__message').textContent = message;

    main.insertAdjacentElement('afterbegin', error);

    document.addEventListener('keydown', function (evt) {
      window.utils.isEscEvent(evt, function () {
        error.remove();
      });
    });

    error.addEventListener('click', function (evt) {
      if (evt.target.className !== 'error__message') {
        error.remove();
      }
    });
  };

  var formSubmitSuccessHandler = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var success = successTemplate.cloneNode(true);

    main.insertAdjacentElement('afterbegin', success);

    deactivateMap();

    document.addEventListener('keydown', function (evt) {
      window.utils.isEscEvent(evt, function () {
        success.remove();
      });
    });

    success.addEventListener('click', function (evt) {
      if (evt.target.className !== 'success__message') {
        success.remove();
      }
    });
  };

  var saveFormData = function (evt) {
    window.backend.save(new FormData(adForm), formSubmitSuccessHandler, errorHandler);
    evt.preventDefault();
  };

  window.form.toggleAllElements(true);

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

      if (pinStyleTop < pinCoords.MIN_Y - mainPinParams.HEIGHT) {
        mapPin.style.top = pinCoords.MIN_Y - mainPinParams.HEIGHT + 'px';
      } else if (pinStyleTop > pinCoords.MAX_Y - mainPinParams.HEIGHT) {
        mapPin.style.top = pinCoords.MAX_Y - mainPinParams.HEIGHT + 'px';
      }

      if (pinStyleLeft < pinCoords.MIN_X) {
        mapPin.style.left = pinCoords.MIN_X - mainPinParams.HALF_WIDTH + 'px';
      } else if (pinStyleLeft > pinCoords.MAX_X - mainPinParams.HALF_WIDTH) {
        mapPin.style.left = pinCoords.MAX_X - mainPinParams.HALF_WIDTH + 'px';
      }

      setAddress();
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
    window.utils.isEnterEvent(evt, activateMap);
  });

  adForm.addEventListener('submit', saveFormData);

  adFormResetButton.addEventListener('click', deactivateMap);

  window.map = {
    getPinCoords: getMapPinCoords
  };
})();
