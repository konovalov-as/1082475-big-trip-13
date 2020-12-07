import AbstractView from './abstract';

const createPointPhotosTemplate = (point) => {
  const createPhotoTemplate = (photo) => {
    return `<img class="event__photo" src="${photo}" alt="Event photo">`;
  };

  const photos = point.destinationInfo[0].photos;

  let photosList = photos
  .map((photo) => createPhotoTemplate(photo))
  .join(``);

  return `<div class="event__photos-container">
    <div class="event__photos-tape">
    ${photosList}
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
