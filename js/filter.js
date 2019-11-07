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
  var housingFeatures = document.querySelectorAll('.map__checkbox');

  var features = Array.from(housingFeatures);

  var filterByHousingType = function (data) {
    return housingType.value === 'any' ? true : data.offer.type === housingType.value;
  };

  var filterByHousingRooms = function (data) {
    return housingRooms.value === 'any' ? true : data.offer.rooms.toString() === housingRooms.value;
  };

  var filterByHousingGuests = function (data) {
    return housingGuests.value === 'any' ? true : data.offer.guests.toString() === housingGuests.value;
  };

  var filterByHousingPrice = function (data) {
    var priceValue = housingPrice.value;

    if (priceValue === Price.LOW) {
      return data.offer.price < Price.LOW_RANGE;
    } else if (priceValue === Price.HIGH) {
      return data.offer.price >= Price.HIGH_RANGE;
    } else if (priceValue === Price.MIDDLE) {
      return data.offer.price >= Price.LOW_RANGE && data.offer.price <= Price.HIGH_RANGE;
    }

    return true;
  };

  var filterByFeatures = function (data) {
    return features
      .filter(function (feature) {
        return feature.checked;
      })
      .map(function (feature) {
        return feature.value;
      })
      .every(function (feature) {
        return data.offer.features.includes(feature);
      });
  };

  window.filter = function (data) {
    return data.filter(function (elements) {
      return filterByHousingType(elements) &&
        filterByHousingPrice(elements) &&
        filterByHousingRooms(elements) &&
        filterByHousingGuests(elements) &&
        filterByFeatures(elements);
    });
  };
})();
