'use strict';

(function () {
  var currentCard;
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

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var map = document.querySelector('.map');

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

  var renderAdvertisementFeatures = function (advertisement) {
    var cardFeatures = document.createDocumentFragment();

    advertisement.offer.features.forEach(function (feature) {
      cardFeatures.appendChild(generateAdvertisementFeature(feature));
    });

    return cardFeatures;
  };

  var renderAdvertisementPhotos = function (advertisement) {
    var photos = document.createDocumentFragment();

    advertisement.offer.photos.forEach(function (photo) {
      photos.appendChild(generateAdvertisementPhoto(photo));
    });

    return photos;
  };

  var popupCloseHandler = function () {
    if (currentCard) {
      currentCard.remove();
    }
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

    var popupClose = card.querySelector('.popup__close');
    popupClose.addEventListener('click', popupCloseHandler);
    document.addEventListener('keydown', function (evt) {
      window.utils.isEscEvent(evt, popupCloseHandler);
    });

    return card;
  };

  var renderCard = function (cardElement) {
    currentCard = cardElement;
    map.insertAdjacentElement('afterbegin', cardElement);
  };

  var showAdCard = function (advertisement) {
    popupCloseHandler();
    renderCard(generateCard(advertisement));
  };

  window.card = {
    remove: popupCloseHandler,
    show: showAdCard
  };
})();
