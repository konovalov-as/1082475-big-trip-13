import {createElement} from '../utils';

export default class PointContainer {
  constructor() {
    this._element = null;
  }

  createPointContainerTemplate() {
    return `<ul class="trip-events__list"></ul>`;
  }

  getTemplate() {
    return this.createPointContainerTemplate();
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
