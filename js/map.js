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

  var main = document.querySelector('main');
  var map = document.querySelector('.map');
  var mapPinsList = map.querySelector('.map__pins');
  var mapPin = mapPinsList.querySelector('.map__pin--main');
  var formElements = document.querySelectorAll('.ad-form__element');
  var filterElements = document.querySelectorAll('.map__filter');
  var adForm = document.querySelector('.ad-form');

  var successHandler = function (data) {
    mapPinsList.appendChild(window.pin.render(data));
  };

  var errorHandler = function (message) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var error = errorTemplate.cloneNode(true);

    error.querySelector('.error__message').textContent = message;

    main.insertAdjacentElement('afterbegin', error);
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

    window.backend.load(successHandler, errorHandler);
  };

  var saveFormData = function (evt) {
    window.backend.save(new FormData(adForm), function () {
      // очистите заполненные поля;
      // удалите метки похожих объявлений и карточку активного объявления;
      // верните метку адреса в исходное положение, не забыв скорректировать координаты, отображаемые в поле «Адрес»;
      // надо вызывать функцию deactivateMap - в ней вызывать функции для действий выше
      // onSuccess - показывать сообщение и закрывать его на esc и на любую область экрана
      // onError - уже показываю ошибку и закрываю при клике на кнопку. Добавить на ESC и любую область экрана
    });
    evt.preventDefault();
  };

  var getMapPinCoords = function () {
    var pinStyleLeft = parseInt(mapPin.style.left, 10);
    var pinStyleTop = parseInt(mapPin.style.top, 10);

    var x = pinStyleLeft + mainPinParams.HALF_WIDTH;
    var y = !isMapActive ? pinStyleTop + mainPinParams.HALF_HEIGHT : pinStyleTop + mainPinParams.HEIGHT;
    return 'x: ' + x + ' y: ' + y;
  };

  window.utils.toggleFormElements(formElements, true);
  window.utils.toggleFormElements(filterElements, true);

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

  main.addEventListener('click', function (evt) {
    var target = evt.target;

    if (target.matches('.error__button')) {
      document.querySelector('.error').remove();
      window.backend.load(successHandler, errorHandler);
    }
  });

  adForm.addEventListener('submit', saveFormData, formSubmitErrorHandler);

  window.map = {
    getPinCoords: getMapPinCoords
  };
})();
