'use strict';

var TITLES = ['Заголовок-1', 'Заголовок-2', 'Заголовок-3', 'Заголовок-4', 'Заголовок-5', 'Заголовок-6', 'Заголовок-7', 'Заголовок-8'];
var PRICES = [1000, 3500, 12000, 1234];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = [1, 2, 3, 4];
var GUESTS = [2, 4, 6, 8];
var HOURS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = ['Описание-1', 'Описание-2', 'Описание-3', 'Описание-4', 'Описание-5', 'Описание-6', 'Описание-7', 'Описание-8'];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
var map = document.querySelector('.map');
var mapPinsList = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var PIN = {
  WIDTH: 50,
  MIN_X: 0,
  MAX_X: map.offsetWidth,
  MIN_Y: 130,
  MAX_Y: 630
};

var getRandomAdData = function (arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);

  return arr[randomIndex];
};

var getRandomArrayPart = function (arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);

  return randomIndex !== 0 ? arr.slice(0, randomIndex) : arr.slice(0, randomIndex + 1);
};

function getRandomCoord(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var generateAdvertisementsList = function () {
  var advertisementsList = [];

  for (var i = 0; i < 8; i++) {
    var advertisement = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png',
      },
      offer: {
        title: getRandomAdData(TITLES),
        address: '600, 350',
        price: getRandomAdData(PRICES),
        type: getRandomAdData(TYPES),
        rooms: getRandomAdData(ROOMS),
        guests: getRandomAdData(GUESTS),
        checkin: getRandomAdData(HOURS),
        checkout: getRandomAdData(HOURS),
        features: getRandomArrayPart(FEATURES),
        description: getRandomAdData(DESCRIPTION),
        photos: getRandomArrayPart(PHOTOS),
      },
      location: {
        x: getRandomCoord(PIN.MIN_X, PIN.MAX_X - PIN.WIDTH),
        y: getRandomCoord(PIN.MIN_Y, PIN.MAX_Y),
      }
    };

    advertisementsList.push(advertisement);
  }

  return advertisementsList;
};

var generatePins = function (advertisement) {
  var pin = pinTemplate.cloneNode(true);

  pin.style.left = advertisement.location.x + 'px';
  pin.style.top = advertisement.location.y + 'px';
  pin.querySelector('img').src = advertisement.author.avatar;
  pin.querySelector('img').alt = advertisement.offer.title;

  return pin;
};

var renderPins = function (advertisementData) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < advertisementData.length; i++) {
    fragment.appendChild(generatePins(advertisementData[i]));
  }

  mapPinsList.appendChild(fragment);
};

map.classList.remove('map--faded');

var advertisementsList = generateAdvertisementsList();

renderPins(advertisementsList);
