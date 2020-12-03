import {createElement} from '../utils';

export default class Tabs {
  constructor(tabs) {
    this._tabs = tabs;
    this._element = null;
  }

  createTabsTemplate(tabs) {
    const [table, stats] = tabs;

    return `
    <h2 class="visually-hidden">Switch trip view</h2>
    <nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn" href="#">${table}</a>
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">${stats}</a>
    </nav>
    `;
  }

  getTemplate() {
    return this.createTabsTemplate(this._tabs);
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
