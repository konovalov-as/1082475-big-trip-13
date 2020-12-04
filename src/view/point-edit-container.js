import {createElement} from '../utils';

export default class PointEditContainer {
  constructor() {
    this._element = null;
  }

  createPointEditContainerTemplate() {
    return `
    <form class="event event--edit" action="#" method="post">
      <header class="event__header"></header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers"></div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>

        </section>
      </section>
    </form>
  `;
  }

  getTemplate() {
    return this.createPointEditContainerTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      const editForm = this._element.querySelector(`.event--edit`);
      this._editForm = editForm;
      // console.log(editForm);
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
