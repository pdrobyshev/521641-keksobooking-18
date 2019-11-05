'use strict';

(function () {
  var KeyCodes = {
    ESC: 27,
    ENTER: 13
  };

  var formElements = document.querySelectorAll('.ad-form fieldset');
  var filterElements = document.querySelectorAll('.map__filter');
  var filterFeatures = document.querySelectorAll('.map__features');

  window.utils = {
    isEscEvent: function (evt, action, arg) {
      if (evt.keyCode === KeyCodes.ESC) {
        action(arg);
      }
    },
    isEnterEvent: function (evt, action, arg) {
      if (evt.keyCode === KeyCodes.ENTER) {
        action(arg);
      }
    },
    toggleFormElements: function (elements, isActive) {
      Array.prototype.forEach.call(elements, function (element) {
        element.disabled = isActive;
      });
    },
    toggleAllFormElements: function (bool) {
      window.utils.toggleFormElements(formElements, bool);
      window.utils.toggleFormElements(filterElements, bool);
      window.utils.toggleFormElements(filterFeatures, bool);
    }
  };
})();
