import AbstractView from './abstract';
// import {SortType} from "../const.js";
import {createElement, render, RenderPosition} from '../utils/render';
import SortingElementView from './sorting-element';

const createSortingContainerTemplate = () => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get"></form>`;
};

export default class Sorting extends AbstractView {
  constructor(currentSortType, sorting) {
    super();
    this._currentSortType = currentSortType;
    this._sorting = sorting;
  }

  getTemplate() {
    return createSortingContainerTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());

      const fragment = document.createDocumentFragment();
      for (const sort of this._sorting) {
        fragment.appendChild(new SortingElementView(sort).getElement());
      }

      render(this._element, fragment, RenderPosition.BEFOREEND);
    }

    return this._element;
  }

  _onSortTypeChange(evt) {
    // if (evt.target.tagName !== `A`) {
    //   return;
    // }

    evt.preventDefault();
    // this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setOnSortTypeChange(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._onSortTypeChange);
  }
}
