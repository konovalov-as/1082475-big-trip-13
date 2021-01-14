import AbstractView from './abstract';

// const createSortTemplate = (sortItem, currentSortType) => {
//   return `<div class="trip-sort__item  trip-sort__item--${sortItem.name}">
//     <input id="sort-${sortItem.name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortItem.name}" ${currentSortType === sortItem.sortType ? `checked` : ``} ${sortItem.isChecked ? `checked` : ``} ${sortItem.isDisabled ? `disabled` : ``}>
//     <label class="trip-sort__btn" for="sort-${sortItem.name}" data-sort-type="${sortItem.sortType}">${sortItem.name}</label>
//   </div>`;
// };

// const createSortTemplates = (currentSortType) => {
//   const sortTemplates = sort
//   .map((sortItem) => createSortTemplate(sortItem, currentSortType))
//   .join(``);

//   return sortTemplates;
// };

const createStatsTemplate = () => {
  return `<section class="statistics">
  <h2 class="visually-hidden">Trip statistics</h2>

  <div class="statistics__item statistics__item--money">
    <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
    <p>Text Text Text</p>
  </div>

  <div class="statistics__item statistics__item--transport">
    <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
    <p>Text Text Text</p>
  </div>

  <div class="statistics__item statistics__item--time-spend">
    <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
    <p>Text Text Text</p>
  </div>
</section>`;
};

export default class Stats extends AbstractView {
  constructor() {
    super();
    // this._currentSortType = currentSortType;
    // this._onSortTypeChange = this._onSortTypeChange.bind(this);
  }

  getTemplate() {
    return createStatsTemplate();
  }

  // _onSortTypeChange(evt) {
  //   if (!evt.target.matches(`.trip-sort__btn`) || evt.target.dataset.sortType === `null`) {
  //     return;
  //   }

  //   evt.preventDefault();
  //   this._callback.onSortTypeChange(evt.target.dataset.sortType);
  // }

  // setOnSortTypeChange(callback) {
  //   this._callback.onSortTypeChange = callback;
  //   this.getElement().addEventListener(`click`, this._onSortTypeChange);
  // }
}
