import AbstractView from './abstract';
import {MenuItem} from '../const';

const createMainNavTemplate = () => {
  return `<nav class="trip-controls__trip-tabs trip-tabs">
    <a class="trip-tabs__btn trip-tabs__btn--active" href="#" id="${MenuItem.TABLE}">${MenuItem.TABLE}</a>
    <a class="trip-tabs__btn" href="#" id="${MenuItem.STATS}">${MenuItem.STATS}</a>
  </nav>`;
};

export default class MainNav extends AbstractView {
  constructor(newEventButton, currentMainNavItem) {
    super();
    this._newEventButton = newEventButton;
    this._currentMainNavItem = currentMainNavItem;
    this._callback = {};

    this._newEventButton.id = MenuItem.NEW_EVENT;
    this._onMainNavClick = this._onMainNavClick.bind(this);
  }

  getTemplate() {
    return createMainNavTemplate(this._currentMainNavItem);
  }

  _onMainNavClick(evt) {
    evt.preventDefault();
    const target = evt.target;
    if (target.attributes.id === undefined) {
      return;
    }

    const mainNavItems = target.parentNode.querySelectorAll(`.trip-tabs__btn`);
    mainNavItems.forEach((mainNavItem) => {
      mainNavItem.classList.remove(`trip-tabs__btn--active`);
      if (target.attributes.id.value === mainNavItem.attributes.id.value) {
        mainNavItem.classList.add(`trip-tabs__btn--active`);
        this._newEventButton.disabled = false;
      }
    });

    if (target.attributes.id.value === MenuItem.NEW_EVENT) {
      this._newEventButton.disabled = true;
    }

    this._callback.onMainNavClick(target.attributes.id.value);
  }

  setOnMainNavClick(callback) {
    this._callback.onMainNavClick = callback;
    this.getElement().addEventListener(`click`, this._onMainNavClick);
    this._newEventButton.addEventListener(`click`, this._onMainNavClick);
  }

  setMenuItem(menuItem) {
    const item = this.getElement().querySelector(`[id=${menuItem}]`);

    if (item !== null) {
      item.classList.add(`trip-tabs__btn--active`);
    }
  }
}
