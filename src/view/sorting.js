import AbstractView from './abstract';
import {createElement, render, RenderPosition} from '../utils/render';
import SortingElementView from './sorting-element';

const createSortingContainerTemplate = () => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get"></form>`;
};

export default class Sorting extends AbstractView {
  constructor(sorting) {
    super();
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

}
