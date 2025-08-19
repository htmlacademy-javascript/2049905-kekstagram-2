import './util.js';
import { photos } from './data.js';
import { drawThumbnails } from './thumbnails.js';
import { changeImgUploadForm } from './form-img-upload.js';

window.console.log(photos);

drawThumbnails(photos);

changeImgUploadForm();
