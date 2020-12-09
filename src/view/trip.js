import AbstractView from './abstract';

const createTripTemplate = () => {
  return `<ul class="trip-events__list"></ul>`;
};

export default class Trip extends AbstractView {
  getTemplate() {
    return createTripTemplate();
  }
}
