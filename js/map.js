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
  var currentPins = [];

  var main = document.querySelector('main');
  var map = document.querySelector('.map');
  var mapPinsList = map.querySelector('.map__pins');
  var mapPin = mapPinsList.querySelector('.map__pin--main');
  var formElements = document.querySelectorAll('.ad-form fieldset');
  var filterElements = document.querySelectorAll('.map__filter');
  var filterFeatures = document.querySelectorAll('.map__features');
  var adForm = document.querySelector('.ad-form');
  var adFormResetButton = document.querySelector('.ad-form__reset');
  var mapFilters = document.querySelector('.map__filters');

  var getMapPinCoords = function () {
    var pinStyleLeft = parseInt(mapPin.style.left, 10);
    var pinStyleTop = parseInt(mapPin.style.top, 10);

    var x = pinStyleLeft + mainPinParams.HALF_WIDTH;
    var y = !isMapActive ? pinStyleTop + mainPinParams.HALF_HEIGHT : pinStyleTop + mainPinParams.HEIGHT;
    return 'x: ' + x + ' y: ' + y;
  };

  var initialMainPinCoords = getMapPinCoords();

  var setInitialMainPinCoords = function () {
    var adFormAddress = document.querySelector('input[name="address"]');

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

  var filterFormChangeHandler = function (data) {
    deleteAllPins();
    window.card.remove();
    appendPins(data);
  };

  var appendPins = function (pins) {
    var filteredPins = window.filter(pins);
    var pinsFragment = generatePinsFragment(filteredPins);
    mapPinsList.appendChild(pinsFragment);
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

    main.addEventListener('click', function (evt) {
      var target = evt.target;

      if (target.matches('.error__button')) {
        error.remove();
        window.backend.load(successHandler, errorHandler);
      }
    });

    document.addEventListener('keydown', function (evt) {
      window.utils.isEscEvent(evt, function () {
        error.remove();
      });
    });

    error.addEventListener('click', function () {
      error.remove();
    });
  };

  var toggleAllFormElements = function (bool) {
    window.utils.toggleFormElements(formElements, bool);
    window.utils.toggleFormElements(filterElements, bool);
    window.utils.toggleFormElements(filterFeatures, bool);
  };

  var deactivateMap = function () {
    adForm.reset();
    window.card.remove();
    deleteAllPins();
    setInitialMainPinCoords();
    toggleAllFormElements(true);
    adForm.classList.add('ad-form--disabled');
    map.classList.add('map--faded');
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

    success.addEventListener('click', function () {
      success.remove();
    });
  };

  var saveFormData = function (evt) {
    window.backend.save(new FormData(adForm), formSubmitSuccessHandler, errorHandler);
    evt.preventDefault();
  };

  var activateMap = function () {
    isMapActive = true;

    toggleAllFormElements(false);
    window.form.activate();

    mapPin.removeEventListener('keydown', activateMap);
    mapPin.removeEventListener('mousedown', activateMap);

    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    window.backend.load(successHandler, errorHandler);
  };

  toggleAllFormElements(true);

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
    window.utils.isEnterEvent(evt, activateMap);
  });

  adForm.addEventListener('submit', saveFormData);

  adFormResetButton.addEventListener('click', deactivateMap);

  window.map = {
    getPinCoords: getMapPinCoords,
  };
})();
