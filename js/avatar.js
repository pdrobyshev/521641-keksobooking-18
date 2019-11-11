'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var housingPhotoParams = {
    ALT: 'Фотография жилья',
    WIDTH: 70,
    HEIGHT: 70,
    SRC: 'img/muffin-grey.svg'
  };

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatar = document.querySelector('.ad-form-header__preview img');
  var housingPhotoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var housingPhotoBlock = document.querySelector('.ad-form__photo');

  var createImgNode = function () {
    var img = document.createElement('img');

    img.setAttribute('src', housingPhotoParams.SRC);
    img.setAttribute('width', housingPhotoParams.WIDTH);
    img.setAttribute('height', housingPhotoParams.HEIGHT);
    img.setAttribute('alt', housingPhotoParams.ALT);

    return img;
  };

  var housingPhoto = createImgNode();

  housingPhotoBlock.appendChild(housingPhoto);

  var checkFileExtension = function (file) {
    var fileName = file.name.toLowerCase();

    return FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
  };

  var renderAvatar = function (file, node) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      node.src = reader.result;
    });

    reader.readAsDataURL(file);
  };

  var fileChooserChangeHandler = function (chooser, node) {
    var file = chooser.files[0];

    if (file) {
      var matches = checkFileExtension(file);

      if (matches) {
        renderAvatar(file, node);
      }
    }
  };

  avatarChooser.addEventListener('change', function () {
    fileChooserChangeHandler(avatarChooser, avatar);
  });

  housingPhotoChooser.addEventListener('change', function () {
    fileChooserChangeHandler(housingPhotoChooser, housingPhoto);
  });
})();
