import AbstractView from './abstract';

const createPointPhotosTemplate = (point) => {
  const photos = point.destinationInfo[0].photos;
  let photosList = ``;
  const createPhoto = () => {
    for (const photo of photos) {
      photosList += `<img class="event__photo" src="${photo}" alt="Event photo">`;
    }
    return photosList;
  };

  return `<div class="event__photos-container">
    <div class="event__photos-tape">
    ${createPhoto()}
    </div>
  </div>`;
};

export default class PointPhotos extends AbstractView {
  constructor(point) {
    super();
    this._point = point;
  }

  getTemplate() {
    return createPointPhotosTemplate(this._point);
  }
}
