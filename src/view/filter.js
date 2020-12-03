import {createElement} from '../utils';

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  createFilterTemplate(filters) {
    let template = ``;

    for (const filter of filters) {
      template += `
      <div class="trip-filters__filter">
        <input id="filter-${filter.name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.name}" ${filter.isChecked ? `checked` : ``}>
        <label class="trip-filters__filter-label" for="filter-${filter.name}">${filter.name}</label>
      </div>
    `;
    }

    return template;
  }

  getTemplate() {
    return this.createFilterTemplate(this._filters);
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
