import AbstractView from './abstract';

const createTabsTemplate = (tabs, filters) => {
  const [table, stats] = tabs;
  return `<div class="trip-main__trip-controls  trip-controls">
    <h2 class="visually-hidden">Switch trip view</h2>
    <nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn" href="#">${table}</a>
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">${stats}</a>
    </nav>
    ${createFiltersContainer(filters)}
  </div>`;
};

const createFiltersContainer = (filters) => {
  return `<form class="trip-filters" action="#" method="get">${createFilterTemplate(filters)}</form>`;
};

const createFilterTemplate = (filters) => {
  let template = ``;
  for (const filter of filters) {
    template += `<div class="trip-filters__filter">
      <input id="filter-${filter.name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.name}" ${filter.isChecked ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-${filter.name}">${filter.name}</label>
    </div>`;
  }

  return template;
};

export default class Controls extends AbstractView {
  constructor(tabs, filters) {
    super();
    this._tabs = tabs;
    this._filters = filters;
  }

  getTemplate() {
    return createTabsTemplate(this._tabs, this._filters);
  }
}
