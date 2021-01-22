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

const createFiltersContainerTemplate = (filters, currentFilterType) => {
  const template = filters
  .map((filter) => createFilterTemplate(filter, currentFilterType))
  .join(``);

  return `<form class="trip-filters" action="#" method="get">${template}</form>`;
};

export default class Filters extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._onFilterTypeChange = this._onFilterTypeChange.bind(this);
  }

  getTemplate() {
    return createFiltersContainerTemplate(this._filters, this._currentFilter);
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
