import {createElement} from '../utils';

const createPointDescriptionTemplate = (offer) => {
  const {destinationCity, destinationInfo} = offer;

  return `<p class="event__destination-description">${destinationCity} ${destinationInfo[0].description}</p>`;
};

export default class PointDescription {
  constructor(offer) {
    this._element = null;
    this._offer = offer;
  }

  getTemplate() {
    return createPointDescriptionTemplate(this._offer);
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
