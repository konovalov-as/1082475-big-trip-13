import AbstractView from './abstract';

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

const createTabsTemplate = (tabs, filters, currentFilterType) => {
  const [table, stats] = tabs;
  return `<div class="trip-main__trip-controls  trip-controls">
    <h2 class="visually-hidden">Switch trip view</h2>
    <nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn" href="#">${table}</a>
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">${stats}</a>
    </nav>
    ${createFilters(filters, currentFilterType)}
  </div>`;
};

export default class Controls extends AbstractView {
  constructor(tabs, filters, currentFilterType) {
    super();
    this._tabs = tabs;
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._onFilterTypeChange = this._onFilterTypeChange.bind(this);
  }

  getTemplate() {
    return createTabsTemplate(this._tabs, this._filters, this._currentFilter);
  }

  _onFilterTypeChange(evt) {
    evt.preventDefault();
    this._callback.onFilterType(evt.target.value);
  }

  setOnFilterTypeChange(callback) {
    this._callback.onFilterType = callback;
    this.getElement().addEventListener(`change`, this._onFilterTypeChange);
  }
}
