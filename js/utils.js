'use strict';

(function () {
  var KeyCodes = {
    ESC: 27,
    ENTER: 13
  };

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
    }
  };
})();
