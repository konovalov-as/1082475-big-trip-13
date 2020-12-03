import {createElement} from '../utils';

export default class FilterContainer {
  constructor() {
    this._element = null;
  }

  createFilterContainerTemplate() {
    return `
    <h2 class="visually-hidden">Filter events</h2>
    <form class="trip-filters" action="#" method="get">
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
    `;
  }

  getTemplate() {
    return this.createFilterContainerTemplate();
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

