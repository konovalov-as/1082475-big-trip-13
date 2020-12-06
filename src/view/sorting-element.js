import {createElement} from '../utils';

export default class SortingElement {
  constructor(sorting) {
    this._element = null;
    this._sorting = sorting;
  }

  createSortingTemplate(sorting) {
    return `<div class="trip-sort__item  trip-sort__item--${sorting.name}">
        <input id="sort-${sorting.name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sorting.name}" ${sorting.isChecked ? `checked` : ``} ${sorting.isDisabled ? `disabled` : ``}>
        <label class="trip-sort__btn" for="sort-${sorting.name}">${sorting.name}</label>
      </div>`;
  }

  getTemplate() {
    return this.createSortingTemplate(this._sorting);
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
