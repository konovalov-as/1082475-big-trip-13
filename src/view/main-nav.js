import AbstractView from './abstract';
import {MenuItem} from '../const';

// const createMainNavTemplate = () => {
//   return `<nav class="trip-controls__trip-tabs  trip-tabs">
//     <a class="trip-tabs__btn ${MenuItem.TABLE === currentTab ? `trip-tabs__btn--active` : ``}" href="#" id="${MenuItem.TABLE}">${MenuItem.TABLE}</a>
//     <a class="trip-tabs__btn  ${MenuItem.STATS === currentTab ? `trip-tabs__btn--active` : ``} trip-tabs__btn--active" href="#" id="${MenuItem.STATS}">${MenuItem.STATS}</a>
//   </nav>`;
// };

const createMainNavTemplate = (currentMainNavItem) => {
  return `<nav class="trip-controls__trip-tabs trip-tabs">
    <a class="trip-tabs__btn ${MenuItem.TABLE === currentMainNavItem ? `trip-tabs__btn--active` : ``}" href="#">${MenuItem.TABLE}</a>
    <a class="trip-tabs__btn ${MenuItem.STATS === currentMainNavItem ? `trip-tabs__btn--active` : ``}" href="#">${MenuItem.STATS}</a>
  </nav>`;
};

export default class MainNav extends AbstractView {
  constructor(infoContainer, currentMainNavItem) {
    super();
    this._infoContainer = infoContainer;
    this._currentMainNavItem = currentMainNavItem;
    this._callback = {};

    this._addEventButton = this._infoContainer.querySelector(`.trip-main__event-add-btn`);
    this._onMainNavClick = this._onMainNavClick.bind(this);
  }

  getTemplate() {
    return createMainNavTemplate(this._currentMainNavItem);
  }

  // _onMainNavClick(evt) {
  //   if (!evt.target.matches(`.trip-tabs__btn`) && !evt.target.matches(`.trip-main__event-add-btn`)) {
  //     return;
  //   }

  //   evt.preventDefault();
  //   this._callback.onMainNavItemChange(evt.target.textContent);
  // }

  _onMainNavClick(evt) {
    let target = evt.target.closest(`.trip-main__event-add-btn`);
    if (target) {
      evt.preventDefault();
      // this._addEventButton.disabled = true;
      this._callback.onMainNavClick(target.textContent);
      return;
    }

    target = evt.target.closest(`.trip-tabs__btn`);
    if (!target) {
      return;
    }

    evt.preventDefault();
    this._callback.onMainNavClick(target.textContent);
  }

  setOnMainNavClick(callback) {
    this._callback.onMainNavClick = callback;
    this.getElement().addEventListener(`click`, this._onMainNavClick);
    this._addEventButton.addEventListener(`click`, this._onMainNavClick);
  }
}
