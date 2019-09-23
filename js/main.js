'use strict';

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
var ADVERTISEMENTS_AMOUNT = 8;

var map = document.querySelector('.map');
var mapPinsList = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var getRandomArrayElement = function (arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);

  return arr[randomIndex];
};

var getRandomArrayPart = function (arr) {
  var randomIndex = Math.floor(Math.random() * arr.length + 1);

  return arr.slice(0, randomIndex);
};

var getRandomArbitrary = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getAvatarPath = function (index) {
  return index < 9 ? 'img/avatars/user0' + (index + 1) + '.png' : 'img/avatars/user' + (index + 1) + '.png';
};

var generateAdvertisement = function (i) {
  return {
    author: {
      avatar: getAvatarPath(i),
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: location.x + ', ' + location.y,
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
      x: getRandomArbitrary(pinParams.MIN_X, pinParams.MAX_X - pinParams.WIDTH),
      y: getRandomArbitrary(pinParams.MIN_Y, pinParams.MAX_Y),
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

var generatePin = function (advertisement) {
  var pin = pinTemplate.cloneNode(true);

  pin.style.left = advertisement.location.x + 'px';
  pin.style.top = advertisement.location.y + 'px';
  pin.querySelector('img').src = advertisement.author.avatar;
  pin.querySelector('img').alt = advertisement.offer.title;

  return pin;
};

var renderPins = function (advertisementsList) {
  var fragment = document.createDocumentFragment();

  advertisementsList.forEach(function (advertisement) {
    fragment.appendChild(generatePin(advertisement));
  });

  mapPinsList.appendChild(fragment);
};

map.classList.remove('map--faded');

var advertisementsList = generateAdvertisementsList(ADVERTISEMENTS_AMOUNT);

renderPins(advertisementsList);
