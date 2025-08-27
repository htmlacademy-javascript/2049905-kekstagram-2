const EffectValue = {
  chrome: {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
    unit: ''
  },
  sepia: {
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
    unit: ''
  },
  marvin: {
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    start: 100,
    unit: '%'
  },
  phobos: {
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    start: 3,
    unit: 'px'
  },
  heat: {
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    start: 3,
    unit: ''
  }
};

let currentEffect = 'none';

const imgUploadForm = document.querySelector('.img-upload__form');
const effectContainer = imgUploadForm.querySelector('.img-upload__effect-level');
const effectValueInput = effectContainer.querySelector('.effect-level__value');
const effectSlider = effectContainer.querySelector('.effect-level__slider');
const previewPhoto = imgUploadForm.querySelector('.img-upload__preview > img');

noUiSlider.create(effectSlider, {
  start: 100,
  range: {
    min: 0,
    max: 100
  },
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => Number.isInteger(value) ? value : value.toFixed(1),
    from: parseFloat
  }
});

effectSlider.noUiSlider.on('update', () => {
  const value = effectSlider.noUiSlider.get();
  effectValueInput.value = value;

  if (currentEffect !== 'none') {
    const settings = EffectValue[currentEffect];
    previewPhoto.style.filter = `${settings.filter}(${value}${settings.unit})`;
  }
});

const setupSlider = () => {
  imgUploadForm.addEventListener('change', () => {
    currentEffect = imgUploadForm.effect.value;

    if (currentEffect === 'none') {
      effectContainer.classList.add('hidden');
      previewPhoto.style.filter = '';
      effectValueInput.value = 100;
    } else {
      effectContainer.classList.remove('hidden');
      const settings = EffectValue[currentEffect];

      effectSlider.noUiSlider.updateOptions({
        start: settings.start,
        range: {
          min: settings.min,
          max: settings.max
        },
        step: settings.step
      });

      effectSlider.noUiSlider.set(settings.start);
    }
  });
};

export { setupSlider };
