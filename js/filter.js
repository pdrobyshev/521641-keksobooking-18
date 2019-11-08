'use strict';

(function () {
  var Price = {
    LOW_RANGE: 10000,
    HIGH_RANGE: 50000,
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high',
  };

  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');

  var filterHousing = function (data, filterElement, dataField) {
    return filterElement.value === 'any' ? true : dataField.toString() === filterElement.value;
  };

  var filterByHousingPrice = function (data) {
    var priceValue = housingPrice.value;
    var dataPrice = data.offer.price;

    if (priceValue === Price.LOW) {
      return dataPrice < Price.LOW_RANGE;
    } else if (priceValue === Price.HIGH) {
      return dataPrice >= Price.HIGH_RANGE;
    } else if (priceValue === Price.MIDDLE) {
      return dataPrice >= Price.LOW_RANGE && dataPrice <= Price.HIGH_RANGE;
    }

    return true;
  };

  var filterByFeatures = function (data) {
    var housingFeatures = document.querySelectorAll('.map__checkbox:checked');
    var features = Array.from(housingFeatures);

    return features.every(function (feature) {
      return data.offer.features.includes(feature.value);
    });
  };

  window.filter = function (data) {
    return data.filter(function (elements) {
      return filterByHousingPrice(elements) &&
        filterHousing(elements, housingType, elements.offer.type) &&
        filterHousing(elements, housingRooms, elements.offer.rooms) &&
        filterHousing(elements, housingGuests, elements.offer.guests) &&
        filterByFeatures(elements);
    });
  };
})();
