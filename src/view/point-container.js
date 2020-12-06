import {createElement} from '../utils';

const createPointContainerTemplate = () => {
  return `<ul class="trip-events__list"></ul>`;
};

export default class PointContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createPointContainerTemplate();
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
