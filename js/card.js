'use strict';

(function () {
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
    popupClose.addEventListener('click', closePopup);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === keycodes.ESC) {
        closePopup();
      }
    });

    var renderCard = function (cardElement) {
      currentCard = cardElement;
      mapPinsList.insertAdjacentElement('afterend', cardElement);
    };

    var showAdCard = function (advertisement) {
      closePopup();
      renderCard(generateCard(advertisement));
    };

    return card;
  };
})();