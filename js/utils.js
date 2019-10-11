'use strict';

(function () {
  var KeyCodes = {
    ESC: 27,
    ENTER: 13
  };

  window.util = {
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
    getRandomArrayElement: function (arr) {
      var randomIndex = Math.floor(Math.random() * arr.length);

      return arr[randomIndex];
    },
    getRandomArrayPart: function (arr) {
      var randomIndex = Math.floor(Math.random() * arr.length + 1);

      return arr.slice(0, randomIndex);
    },
    getRandomIntegerInRange: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };
})();
