'use strict';

(function () {
  var MAX_PINS = 5;

  var mapFilters = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  var savedData;

  var filterByHousingType = function (data) {
    return data.filter(function (advertisement) {
      return housingType.value === 'any' ? true : advertisement.offer.type === housingType.value;
    });
  };

  var filter = function (data) {
    // не уверен насколько правильно так делать, но данные инкапсулированы, и используются только внутренней логикой
    savedData = data;
    return filterByHousingType(data).slice(0, MAX_PINS);
  };

  var filterFormChangeHandler = function () {
    var filteredPins = filter(savedData);
    window.map.appendPins(filteredPins);
  };

  mapFilters.addEventListener('change', function () {
    window.pin.deleteAll();
    filterFormChangeHandler();
  });

  window.filter = {
    pins: filter
  };
})();
