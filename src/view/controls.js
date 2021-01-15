import AbstractView from './abstract';
import {MenuItem} from '../const';

const createFilterTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  return `<div class="trip-filters__filter">
    <input
      id="filter-${name}"
      class="trip-filters__filter-input  visually-hidden"
      type="radio"
      name="trip-filter"
      value="${type}"
      ${type === currentFilterType ? `checked` : ``}
      ${count === 0 ? `disabled` : ``}>
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
  </div>`;
};

const createFilters = (filters, currentFilterType) => {
  const template = filters
  .map((filter) => createFilterTemplate(filter, currentFilterType))
  .join(``);

  return `<form class="trip-filters" action="#" method="get">${template}</form>`;
};

const createTabsTemplate = (filters, currentFilterType, currentTab) => {
  // console.log(currentTab)
  // const [table, stats] = tabs;
  return `<div class="trip-main__trip-controls  trip-controls">
    <h2 class="visually-hidden">Switch trip view</h2>
    <nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn ${MenuItem.TABLE === currentTab ? `trip-tabs__btn--active` : ``}" href="#" id="${MenuItem.TABLE}">${MenuItem.TABLE}</a>
      <a class="trip-tabs__btn  ${MenuItem.STATS === currentTab ? `trip-tabs__btn--active` : ``} trip-tabs__btn--active" href="#" id="${MenuItem.STATS}">${MenuItem.STATS}</a>
    </nav>
    ${createFilters(filters, currentFilterType)}
  </div>`;
};

export default class Controls extends AbstractView {
  constructor(filters, currentFilterType, currentTab) {
    super();
    // this._tabs = tabs;
    this._filters = filters;
    this._currentFilter = currentFilterType;
    this._currentTab = currentTab;

    this._onFilterTypeChange = this._onFilterTypeChange.bind(this);

    this._onMenuClick = this._onMenuClick.bind(this);
  }

  getTemplate() {
    return createTabsTemplate(this._filters, this._currentFilter, this._currentTab);
  }

  _onFilterTypeChange(evt) {
    evt.preventDefault();
    this._callback.onFilterType(evt.target.value);
  }

  setOnFilterTypeChange(callback) {
    this._callback.onFilterType = callback;
    this.getElement().addEventListener(`change`, this._onFilterTypeChange);
  }

  _onMenuClick(evt) {
    evt.preventDefault();
    if (!evt.target.matches(`.trip-tabs__btn`)) {
      return;
    }
    this._callback.onMenuClick(evt.target.attributes.id.value);
    // evt.target.attributes.id.value
  }

  setOnMenuClick(callback) {
    this._callback.onMenuClick = callback;
    this.getElement().querySelector(`.trip-tabs`).addEventListener(`click`, this._onMenuClick);
  }
}
