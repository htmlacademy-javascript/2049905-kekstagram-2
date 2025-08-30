import { showAlert } from './util.js';
import { drawThumbnails } from './thumbnails.js';
import { changeImgUploadForm } from './form-img-upload.js';
import { getData } from './api.js';

getData()
  .then((photos) => {
    drawThumbnails(photos);
  })
  .catch(() => {
    showAlert();
  }
  );

changeImgUploadForm();
