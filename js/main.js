'use strict';

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
var offerTypesTranslation = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец'
};
var photoParams = {
  WIDTH: 45,
  HEIGHT: 40,
  ALT: 'Фотография жилья'
};

var map = document.querySelector('.map');
var mapPinsList = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

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

var generateAdvertisementFeature = function (feature) {
  var cardFeature = document.createElement('li');
  cardFeature.className = 'popup__feature popup__feature--' + feature;

  return cardFeature;
};

var renderAdvertisementFeatures = function (advertisement) {
  var cardFeatures = document.createDocumentFragment();

  advertisement.offer.features.forEach(function (feature) {
    cardFeatures.appendChild(generateAdvertisementFeature(feature));
  });

  return cardFeatures;
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

var renderAdvertisementPhotos = function (advertisement) {
  var photos = document.createDocumentFragment();

  advertisement.offer.photos.forEach(function (photo) {
    photos.appendChild(generateAdvertisementPhoto(photo));
  });

  return photos;
};

var generateCard = function (advertisement) {
  var card = cardTemplate.cloneNode(true);

  card.querySelector('.popup__title').textContent = advertisement.offer.title;
  card.querySelector('.popup__text--address').textContent = advertisement.offer.address;
  card.querySelector('.popup__text--price').textContent = advertisement.offer.price + '₽/ночь';
  card.querySelector('.popup__type').textContent = offerTypesTranslation[advertisement.offer.type];
  card.querySelector('.popup__text--capacity').textContent = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;
  card.querySelector('.popup__features').innerHTML = '';
  card.querySelector('.popup__features').appendChild(renderAdvertisementFeatures(advertisement));
  card.querySelector('.popup__description').textContent = advertisement.offer.description;
  card.querySelector('.popup__photos').innerHTML = '';
  card.querySelector('.popup__photos').appendChild(renderAdvertisementPhotos(advertisement));
  card.querySelector('.popup__avatar').setAttribute('src', advertisement.author.avatar);

  return card;
};

var renderCard = function (cardElement) {
  mapPinsList.insertAdjacentElement('afterend', cardElement);
};

var advertisementsList = generateAdvertisementsList(ADVERTISEMENTS_AMOUNT);

renderPins(advertisementsList);

var firstAdvertisement = advertisementsList[0];

var card = generateCard(firstAdvertisement);

renderCard(card);

// eslint-disable-next-line valid-jsdoc
/** ***************************************************************************************************
 *****************************************************************************************************/
var ENTER_KEYCODE = 13;
var adForm = document.querySelector('.ad-form');
var adFormAddress = adForm.querySelector('input[name="address"]');
var mapPin = mapPinsList.querySelector('.map__pin--main');
var isMapActive = false;

var activateFormElement = function (formElement, isActive) {
  return isActive === false ? formElement.setAttribute('disabled', isActive) : formElement.removeAttribute('disabled');
};

var activateFormElements = function (isActive) {
  var formElements = adForm.querySelectorAll('.ad-form__element');
  var filterElements = map.querySelectorAll('.map__filter');

  formElements.forEach(function (formElement) {
    activateFormElement(formElement, isActive);
  });

  filterElements.forEach(function (filterElement) {
    activateFormElement(filterElement, isActive);
  });
};

activateFormElements(false);

var getMapPinCoords = function () {
  var x = pinParams.X + Math.round(mapPin.offsetWidth / 2);
  var y = isMapActive === false ? pinParams.Y + Math.round(mapPin.offsetHeight / 2) : pinParams.Y + mapPin.offsetHeight;
  return 'x: ' + x + ' y: ' + y;
};

var setAddress = function () {
  adFormAddress.value = getMapPinCoords();
};

setAddress();

var rooms = adForm.querySelector('#room_number');
var roomsCapacity = adForm.querySelector('#capacity');
var roomCapacities = {
  0: 'не для гостей',
  1: 'для 1 гостя',
  2: 'для 2 гостей',
  3: 'для 3 гостей'
};

// rooms.addEventListener('change', function (evt) {
//   var roomValue = evt.target.value;
//
//   if (roomValue ===)
// });

// var adFormSubmitHandler = function () {
//   var a = adForm.querySelector('#capacity option');
//   var roomValue = rooms.options[rooms.selectedIndex].value;
//   var roomCapacity = roomsCapacity.options[roomsCapacity.selectedIndex].value;
//   console.log(roomValue);
//   console.log(roomCapacity);
//
//   if (roomCapacity !== roomValue) {
//     a.setCustomValidity('asd');
//   } else {
//     roomsCapacity.setCustomValidity('');
//   }
// };
//
// adForm.addEventListener('submit', adFormSubmitHandler);

var activateMap = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  activateFormElements(true);
  isMapActive = true;
  setAddress();
  // adFormSubmitHandler();
  // mapPin.removeEventListener('keydown', activateMap);
  // mapPin.removeEventListener('mousedown', activateMap);
};

mapPin.addEventListener('mousedown', activateMap);
mapPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activateMap();
  }
});
