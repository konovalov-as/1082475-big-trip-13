import AbstractView from './abstract';
import {SortType} from '../const';

const sort = [{
  name: SortType.DAY,
  isChecked: true,
  isDisabled: false,
  sortType: SortType.DAY,
},
{
  name: SortType.EVENT,
  isChecked: false,
  isDisabled: true,
  sortType: null,
},
{
  name: SortType.TIME,
  isChecked: false,
  isDisabled: false,
  sortType: SortType.TIME,
},
{
  name: SortType.PRICE,
  isChecked: false,
  isDisabled: false,
  sortType: SortType.PRICE,
},
{
  name: SortType.OFFERS,
  isChecked: false,
  isDisabled: true,
  sortType: null,
}];

const createSortTemplate = (sortItem, currentSortType) => {
  return `<div class="trip-sort__item  trip-sort__item--${sortItem.name}">
    <input id="sort-${sortItem.name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortItem.name}" ${currentSortType === sortItem.sortType ? `checked` : ``} ${sortItem.isChecked ? `checked` : ``} ${sortItem.isDisabled ? `disabled` : ``}>
    <label class="trip-sort__btn" for="sort-${sortItem.name}" data-sort-type="${sortItem.sortType}">${sortItem.name}</label>
  </div>`;
};

const createSortTemplates = (currentSortType) => {
  const sortTemplates = sort
  .map((sortItem) => createSortTemplate(sortItem, currentSortType))
  .join(``);

  return sortTemplates;
};

const createSortContainerTemplate = (currentSortType) => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">${createSortTemplates(currentSortType)}</form>`;
};

export default class Sort extends AbstractView {
  constructor(currentSortType) {
    super();
    this._currentSortType = currentSortType;
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
  }

  getTemplate() {
    return createSortContainerTemplate(this._currentSortType);
  }

  _onSortTypeChange(evt) {
    if (!evt.target.matches(`.trip-sort__btn`) || evt.target.dataset.sortType === `null`) {
      return;
    }

    evt.preventDefault();
    this._callback.onSortTypeChange(evt.target.dataset.sortType);
  }

  setOnSortTypeChange(callback) {
    this._callback.onSortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._onSortTypeChange);
  }
}
