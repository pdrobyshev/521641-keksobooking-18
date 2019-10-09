'use strict';

(function () {
  var ADVERTISEMENTS_AMOUNT = 8;
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
    MAX_Y: 630,
    X: 570,
    Y: 375
  };

  var getRandomArrayElement = function (arr) {
    var randomIndex = Math.floor(Math.random() * arr.length);

    return arr[randomIndex];
  };

  var getRandomArrayPart = function (arr) {
    var randomIndex = Math.floor(Math.random() * arr.length + 1);

    return arr.slice(0, randomIndex);
  };

  var getRandomIntegerInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getAvatarPath = function (index) {
    return index < 9 ? 'img/avatars/user0' + (index + 1) + '.png' : 'img/avatars/user' + (index + 1) + '.png';
  };

  var generateAdvertisement = function (i) {
    var coordX = getRandomIntegerInRange(pinParams.MIN_X, pinParams.MAX_X - pinParams.WIDTH);
    var coordY = getRandomIntegerInRange(pinParams.MIN_Y, pinParams.MAX_Y);

    return {
      author: {
        avatar: getAvatarPath(i),
      },
      offer: {
        title: getRandomArrayElement(TITLES),
        address: coordX + ', ' + coordY,
        price: getRandomArrayElement(PRICES),
        type: getRandomArrayElement(TYPES),
        rooms: getRandomArrayElement(ROOMS),
        guests: getRandomArrayElement(GUESTS),
        checkin: getRandomArrayElement(HOURS),
        checkout: getRandomArrayElement(HOURS),
        features: getRandomArrayPart(FEATURES),
        description: getRandomArrayElement(DESCRIPTIONS),
        photos: getRandomArrayPart(PHOTOS),
      },
      location: {
        x: coordX,
        y: coordY,
      }
    };
  };

  var generateAdvertisementsList = function (amount) {
    var advertisementsList = [];

    for (var i = 0; i < amount; i++) {
      var advertisement = generateAdvertisement(i);

      advertisementsList.push(advertisement);
    }

    return advertisementsList;
  };

  var generateAdvertisementFeature = function (feature) {
    var cardFeature = document.createElement('li');
    cardFeature.className = 'popup__feature popup__feature--' + feature;

    return cardFeature;
  };

  var generateAdvertisementPhoto = function (src) {
    var photo = document.createElement('img');
    photo.className = 'popup__photo';
    photo.setAttribute('src', src);
    photo.setAttribute('width', photoParams.WIDTH);
    photo.setAttribute('height', photoParams.HEIGHT);
    photo.setAttribute('alt', photoParams.ALT);

    return photo;
  };

  var getMapPinCoords = function () {
    var x = pinParams.X + Math.round(mapPin.offsetWidth / 2);
    var y = !isMapActive ? pinParams.Y + Math.round(mapPin.offsetHeight / 2) : pinParams.Y + mapPin.offsetHeight;
    return 'x: ' + x + ' y: ' + y;
  };
})();