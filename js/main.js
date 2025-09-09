import { showDataErrorMessage } from './notifications.js';
import { showThumbnails } from './thumbnails.js';
import { openImgUploadForm } from './form-img-upload.js';
import { getData } from './api.js';

getData()
  .then((photos) => {
    showThumbnails(photos);
  })
  .catch(() => {
    showDataErrorMessage();
  }
  );

openImgUploadForm();
