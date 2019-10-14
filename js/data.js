'use strict';

(function () {
  var TITLES = ['Заголовок-1', 'Заголовок-2', 'Заголовок-3', 'Заголовок-4', 'Заголовок-5', 'Заголовок-6', 'Заголовок-7', 'Заголовок-8'];
  var PRICES = [1000, 3500, 12000, 1234];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var ROOMS = [1, 2, 3, 4];
  var GUESTS = [2, 4, 6, 8];
  var HOURS = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTIONS = ['Описание-1', 'Описание-2', 'Описание-3', 'Описание-4', 'Описание-5', 'Описание-6', 'Описание-7', 'Описание-8'];
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  ];
  var pinParams = {
    WIDTH: 50,
    MIN_X: 0,
    MAX_X: 1200,
    MIN_Y: 130,
    MAX_Y: 630
  };

  var getAvatarPath = function (index) {
    return index < 9 ? 'img/avatars/user0' + (index + 1) + '.png' : 'img/avatars/user' + (index + 1) + '.png';
  };

  var generateAdvertisement = function (i) {
    var coordX = window.utils.getRandomIntegerInRange(pinParams.MIN_X, pinParams.MAX_X - pinParams.WIDTH);
    var coordY = window.utils.getRandomIntegerInRange(pinParams.MIN_Y, pinParams.MAX_Y);

    return {
      author: {
        avatar: getAvatarPath(i),
      },
      offer: {
        title: window.utils.getRandomArrayElement(TITLES),
        address: coordX + ', ' + coordY,
        price: window.utils.getRandomArrayElement(PRICES),
        type: window.utils.getRandomArrayElement(TYPES),
        rooms: window.utils.getRandomArrayElement(ROOMS),
        guests: window.utils.getRandomArrayElement(GUESTS),
        checkin: window.utils.getRandomArrayElement(HOURS),
        checkout: window.utils.getRandomArrayElement(HOURS),
        features: window.utils.getRandomArrayPart(FEATURES),
        description: window.utils.getRandomArrayElement(DESCRIPTIONS),
        photos: window.utils.getRandomArrayPart(PHOTOS),
      },
      location: {
        x: coordX,
        y: coordY,
      }
    };
  };

  window.data = {
    generateAdvertisement: generateAdvertisement
  };
})();
