import AbstractView from './abstract';
import {MenuItem} from '../const';

const createButtonTemplate = () => {
  return `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button" id="${MenuItem.NEW_EVENT}">New event</button>`;
};

export default class NewEventButton extends AbstractView {
  constructor() {
    super();
    this._onNewEventClick = this._onNewEventClick.bind(this);
  }

  getTemplate() {
    return createButtonTemplate();
  }

  _onNewEventClick(evt) {
    evt.preventDefault();
    // console.log(evt)
    if (!evt.target.matches(`.trip-main__event-add-btn`)) {
      return;
    }
    this._callback.onNewEventClick(evt.target.attributes.id.value);
  }

  setOnNewEventClick(callback) {
    this._callback.onNewEventClick = callback;
    this.getElement().addEventListener(`click`, this._onNewEventClick);
  }
}
