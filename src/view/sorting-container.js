import {createElement} from '../utils';

export default class SortingContainer {
  constructor() {
    this._element = null;
  }

  createSortingContainerTemplate() {
    return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get"></form>`;
  }

  getTemplate() {
    return this.createSortingContainerTemplate();
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
