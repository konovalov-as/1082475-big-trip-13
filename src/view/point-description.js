import {createElement} from '../utils';

export default class PointDescription {
  constructor(offer) {
    this._offer = offer;
    this._element = null;
  }

  createPointDescriptionTemplate(offer) {
    const {destinationCity, destinationInfo} = offer;

    return `
    <p class="event__destination-description">${destinationCity} ${destinationInfo[0].description}</p>
    `;
  }

  getTemplate() {
    return this.createPointDescriptionTemplate(this._offer);
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
