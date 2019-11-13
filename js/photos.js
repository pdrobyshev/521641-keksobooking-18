'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var housingPhotoParams = {
    ALT: 'Фотография жилья',
    WIDTH: 68,
    HEIGHT: 70
  };
  var photosBlockWidth = 304;

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatar = document.querySelector('.ad-form-header__preview img');
  var housingPhotoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var housingPhotoBlock = document.querySelector('.ad-form__photo');

  housingPhotoBlock.style.width = photosBlockWidth + 'px';

  var createImgNode = function (src) {
    var img = document.createElement('img');

    img.setAttribute('src', src);
    img.setAttribute('width', housingPhotoParams.WIDTH);
    img.setAttribute('height', housingPhotoParams.HEIGHT);
    img.setAttribute('alt', housingPhotoParams.ALT);
    img.style.border = '1px solid rgba(0, 0, 0, 0.2)';
    img.style.borderRadius = '4px';
    img.style.margin = '0 4px';

    return img;
  };

  var renderAvatar = function (src) {
    avatar.src = src;
  };

  var renderHousingPhotos = function (src) {
    var photo = createImgNode(src);
    housingPhotoBlock.appendChild(photo);
  };

  var checkFileExtension = function (files, cb) {
    Array.from(files).forEach(function (file) {
      if (file) {
        var fileName = file.name.toLowerCase();

        var matches = FILE_TYPES.some(function (it) {
          return fileName.endsWith(it);
        });

        if (matches) {
          readFile(file, cb);
        }
      }
    });
  };

  var readFile = function (file, cb) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      cb(reader.result);
    });

    reader.readAsDataURL(file);
  };

  var fileChooserChangeHandler = function (chooser, cb) {
    var files = chooser.files;

    checkFileExtension(files, cb);
  };

  avatarChooser.addEventListener('change', function () {
    fileChooserChangeHandler(avatarChooser, renderAvatar);
  });

  housingPhotoChooser.addEventListener('change', function () {
    fileChooserChangeHandler(housingPhotoChooser, renderHousingPhotos);
  });
})();
