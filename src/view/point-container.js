import AbstractView from './abstract';

const createPointContainerTemplate = () => {
  return `<ul class="trip-events__list"></ul>`;
};

export default class PointContainer extends AbstractView {
  getTemplate() {
    return createPointContainerTemplate();
  }
}
