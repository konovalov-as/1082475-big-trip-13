import {createElement} from '../utils';

export default class PointPhotos {
  constructor(point) {
    this._point = point;
    this._element = null;
  }

  createPointPhotosTemplate(point) {
    const photos = point.destinationInfo[0].photos;
    let photosList = ``;
    const createPhoto = () => {
      for (const photo of photos) {
        photosList += `
        <img class="event__photo" src="${photo}" alt="Event photo">
        `;
      }
      return photosList;
    };

    return `
    <div class="event__photos-container">
      <div class="event__photos-tape">
      ${createPhoto()}
      </div>
    </div>
    `;
  }

  getTemplate() {
    return this.createPointPhotosTemplate(this._point);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
