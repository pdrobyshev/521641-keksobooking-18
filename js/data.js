'use strict';

(function () {
  var DATA_URL = 'https://js.dump.academy/keksobooking/data';
  var URL = 'https://js.dump.academy/keksobooking';
  var STATUS_SUCCESS = 200;
  var TIMEOUT = 10000;

  var request = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_SUCCESS) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  var download = function (onSuccess, onError) {
    var xhr = request(onSuccess, onError);
    xhr.open('GET', DATA_URL);
    xhr.send();
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = request(onSuccess, onError);
    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.data = {
    upload: upload,
    download: download
  };
})();
