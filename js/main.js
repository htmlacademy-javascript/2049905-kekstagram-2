import { showDataErrorMessage } from './notifications.js';
import { drawThumbnails } from './thumbnails.js';
import { openImgUploadForm } from './form-img-upload.js';
import { getData } from './api.js';

getData()
  .then((photos) => {
    drawThumbnails(photos);
  })
  .catch(() => {
    showDataErrorMessage();
  }
  );

openImgUploadForm();
