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
  var photoParams = {
    WIDTH: 45,
    HEIGHT: 40,
    ALT: 'Фотография жилья'
  };

  var getAvatarPath = function (index) {
    return index < 9 ? 'img/avatars/user0' + (index + 1) + '.png' : 'img/avatars/user' + (index + 1) + '.png';
  };

  var generateAdvertisement = function (i) {
    var coordX = window.util.getRandomIntegerInRange(pinParams.MIN_X, pinParams.MAX_X - pinParams.WIDTH);
    var coordY = window.util.getRandomIntegerInRange(pinParams.MIN_Y, pinParams.MAX_Y);

    return {
      author: {
        avatar: getAvatarPath(i),
      },
      offer: {
        title: window.util.getRandomArrayElement(TITLES),
        address: coordX + ', ' + coordY,
        price: window.util.getRandomArrayElement(PRICES),
        type: window.util.getRandomArrayElement(TYPES),
        rooms: window.util.getRandomArrayElement(ROOMS),
        guests: window.util.getRandomArrayElement(GUESTS),
        checkin: window.util.getRandomArrayElement(HOURS),
        checkout: window.util.getRandomArrayElement(HOURS),
        features: window.util.getRandomArrayPart(FEATURES),
        description: window.util.getRandomArrayElement(DESCRIPTIONS),
        photos: window.util.getRandomArrayPart(PHOTOS),
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

  window.data = {
    generateAdvertisementsList: generateAdvertisementsList,
    generateAdvertisementFeature: generateAdvertisementFeature,
    generateAdvertisementPhoto: generateAdvertisementPhoto
  };
})();
