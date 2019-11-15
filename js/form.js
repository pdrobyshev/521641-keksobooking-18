'use strict';

(function () {
  var maxGuestsInRoom = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };
  var housingMinPrices = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };

  var rooms = document.querySelector('#room_number');
  var roomsCapacity = document.querySelector('#capacity');
  var capacityOptions = roomsCapacity.querySelectorAll('option');
  var price = document.querySelector('#price');
  var type = document.querySelector('#type');
  var typeOptions = document.querySelectorAll('#type option');
  var checkIn = document.querySelector('#timein');
  var checkOut = document.querySelector('#timeout');
  var formElements = document.querySelectorAll('.ad-form fieldset');
  var filterElements = document.querySelectorAll('.map__filter');
  var filterFeatures = document.querySelectorAll('.map__features');
  var adFormSubmitButton = document.querySelector('.ad-form__submit');

  var toggleAllFormElements = function (bool) {
    window.utils.toggleFormElements(formElements, bool);
    window.utils.toggleFormElements(filterElements, bool);
    window.utils.toggleFormElements(filterFeatures, bool);
  };

  var compareRoomsToCapacity = function () {
    var roomActiveOption = rooms.value;
    var capacityActiveOption = roomsCapacity.options[roomsCapacity.selectedIndex];

    maxGuestsInRoom[roomActiveOption].forEach(function () {
      capacityOptions.forEach(function (capacityOption) {
        capacityOption.disabled = !maxGuestsInRoom[roomActiveOption].includes(capacityOption.value);
      });
    });

    if (capacityActiveOption.hasAttribute('disabled')) {
      roomsCapacity.selectedIndex = maxGuestsInRoom[roomActiveOption].includes(capacityActiveOption);
    }
  };

  var onRoomsChange = function () {
    compareRoomsToCapacity();
  };

  var setPrice = function () {
    typeOptions.forEach(function (option) {
      if (type.value === option.value) {
        setMinPrice(housingMinPrices[option.value]);
      }
    });
  };

  var onTypeChange = function () {
    setPrice();
  };

  var setMinPrice = function (minPrice) {
    price.setAttribute('min', minPrice);
    price.placeholder = minPrice;
  };

  var onCheckOutTimeChange = function () {
    checkOut.value = checkIn.value;
  };

  var onCheckInTimeChange = function () {
    checkIn.value = checkOut.value;
  };

  var activate = function () {
    setPrice();
    compareRoomsToCapacity();
  };

  var checkFormInputs = function () {
    var requiredInputs = document.querySelectorAll('input:required');

    requiredInputs.forEach(function (input) {
      if (!input.checkValidity()) {
        input.style.boxShadow = '0 0 2px 2px #ff6547';
      } else {
        input.style.boxShadow = '';
      }
    });
  };

  type.addEventListener('change', onTypeChange);
  checkIn.addEventListener('change', onCheckOutTimeChange);
  checkOut.addEventListener('change', onCheckInTimeChange);
  rooms.addEventListener('change', onRoomsChange);
  adFormSubmitButton.addEventListener('click', checkFormInputs);

  window.form = {
    activate: activate,
    toggleAllElements: toggleAllFormElements,
    checkInputsValidity: checkFormInputs
  };
})();
