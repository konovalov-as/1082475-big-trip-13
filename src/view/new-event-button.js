import AbstractView from './abstract';

const createButtonTemplate = () => {
  return `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`;
};

export default class NewEventButton extends AbstractView {
  getTemplate() {
    return createButtonTemplate();
  }
}
