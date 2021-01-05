import AbstractView from './abstract';

const createNoPointTemplate = () => {
  return `<p class="trip-events__msg">Loading...</p>`;
};

export default class Loading extends AbstractView {
  getTemplate() {
    return createNoPointTemplate();
  }
}
