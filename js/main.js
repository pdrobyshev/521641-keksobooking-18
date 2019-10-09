'use strict';

var keycodes = {
  ESC: 27,
  ENTER: 13
};
var isMapActive = false;
var offerTypesTranslation = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец'
};
var photoParams = {
  WIDTH: 45,
  HEIGHT: 40,
  ALT: 'Фотография жилья'
};
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
var currentCard;

var map = document.querySelector('.map');
var mapPinsList = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var adForm = document.querySelector('.ad-form');
var adFormAddress = adForm.querySelector('input[name="address"]');
var rooms = adForm.querySelector('#room_number');
var roomsCapacity = adForm.querySelector('#capacity');
var mapPin = mapPinsList.querySelector('.map__pin--main');
var formElements = adForm.querySelectorAll('.ad-form__element');
var filterElements = map.querySelectorAll('.map__filter');
var capacityOptions = roomsCapacity.querySelectorAll('option');
var type = adForm.querySelector('#type');
var typeOptions = adForm.querySelectorAll('#type option');
var checkIn = adForm.querySelector('#timein');
var checkOut = adForm.querySelector('#timeout');
var price = adForm.querySelector('#price');

var toggleFormElements = function (elements, isActive) {
  Array.prototype.forEach.call(elements, function (element) {
    element.disabled = isActive;
  });
};

var setAddress = function () {
  adFormAddress.value = getMapPinCoords();
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

var closePopup = function () {
  if (currentCard) {
    currentCard.remove();
  }
};

var setPrice = function () {
  typeOptions.forEach(function (option) {
    if (type.value === option.value) {
      setMinPrice(housingMinPrices[option.value]);
    }
  });
};

var setMinPrice = function (minPrice) {
  price.setAttribute('min', minPrice);
  price.placeholder = minPrice;
};

var setCheckOutTime = function () {
  var checkInValue = checkIn.options[checkIn.selectedIndex];
  checkOut.value = checkInValue.value;
};

var setCheckInTime = function () {
  var checkOutValue = checkOut.options[checkOut.selectedIndex];
  checkIn.value = checkOutValue.value;
};

type.addEventListener('change', setPrice);
checkIn.addEventListener('change', setCheckOutTime);
checkOut.addEventListener('change', setCheckInTime);

toggleFormElements(formElements, true);
toggleFormElements(filterElements, true);

setAddress();

mapPin.addEventListener('mousedown', activateMap);
mapPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === keycodes.ENTER) {
    activateMap();
  }
});
