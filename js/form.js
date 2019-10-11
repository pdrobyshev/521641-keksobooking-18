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

  var roomsCapacity = document.querySelector('#capacity');
  var capacityOptions = roomsCapacity.querySelectorAll('option');
  var adFormAddress = document.querySelector('input[name="address"]');
  var price = document.querySelector('#price');
  var type = document.querySelector('#type');
  var typeOptions = document.querySelectorAll('#type option');
  var checkIn = document.querySelector('#timein');
  var checkOut = document.querySelector('#timeout');

  var setAddress = function () {
    adFormAddress.value = window.map.getPinCoords();
  };

  var compareRoomsToCapacity = function () {
    var rooms = document.querySelector('#room_number');

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

  setAddress();

  type.addEventListener('change', setPrice);
  checkIn.addEventListener('change', setCheckOutTime);
  checkOut.addEventListener('change', setCheckInTime);

  window.form = {
    setAddress: setAddress,
    setPrice: setPrice,
    compareRoomsToCapacity: compareRoomsToCapacity
  };
})();
