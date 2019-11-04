'use strict';

(function () {
  var MAX_PINS = 5;

  var housingType = document.querySelector('#housing-type');

  var filterByHousingType = function (data) {
    return data.filter(function (advertisement) {
      return housingType.value === 'any' ? true : advertisement.offer.type === housingType.value;
    });
  };

  window.filter = function (data) {
    return filterByHousingType(data).slice(0, MAX_PINS);
  };
})();
