import AbstractView from './abstract';
import {createElement, render, RenderPosition} from '../utils/render';
import PointHeaderEditView from './point-header-edit';
import PointDescriptionView from './point-description';
import PointPhotosView from './point-photos';

import {generateOffers} from '../mock/point';
import {generateDescription} from '../mock/point';

const createAvailableOfferTemplate = (offer) => {
  return `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.condition}-1" type="checkbox" name="event-offer-${offer.condition}" ${offer.isChecked ? `checked` : ``}>
  <label class="event__offer-label" for="event-offer-${offer.condition}-1">
    <span class="event__offer-title">${offer.condition}</span>
    &plus;&euro;&nbsp;
  <span class="event__offer-price">${offer.cost}</span>
  </label>
</div>`;
};

const createPointEditContainerTemplate = (point) => {
  let options = point.offers
  .map((offer) => createAvailableOfferTemplate(offer))
  .join(``);

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">${options}</div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>

      </section>
    </section>
  </form>
  </li>`;
};

export default class PointEdit extends AbstractView {
  constructor(point) {
    super();
    this._point = point;
    this._editForm = null;
    this._headerEditContainer = null;
    this._descriptionContainer = null;
    this._description = null;
    this._photos = null;
    this._onFormSubmitClick = this._onFormSubmitClick.bind(this);
    this._callback = {};

    this._onPointTypeChange = this._onPointTypeChange.bind(this);
    this._onDestinationChange = this._onDestinationChange.bind(this);

    this._setInnerOn();
  }

  getTemplate() {
    return createPointEditContainerTemplate(this._point);
  }

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }

    this._point = Object.assign(
        {},
        this._point,
        update
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);

    this.restoreOn();
  }

  restoreOn() {
    this._setInnerOn();
    this.setOnFormSubmitClick(this._callback.onFormSubmitClick);
  }

  _setInnerOn() {
    this.getElement()
      .querySelector(`.event__type-list`)
      .addEventListener(`click`, this._onPointTypeChange);
    this.getElement()
      .querySelector(`#event-destination-1`)
      .addEventListener(`input`, this._onDestinationChange);
  }

  _onPointTypeChange(evt) {
    if (evt.target.matches(`input.event__type-input`)) {
      evt.preventDefault();
      const updatedPoint = this._point.offers = generateOffers();
      this.updateData(updatedPoint);
    }
  }

  _onDestinationChange(evt) {
    evt.preventDefault();
    // console.log(evt.target.value);
    // const updatedPoint = this._point.destinationInfo[0].description = generateDescription();
    // this.updateData(updatedPoint);

    const updatedPoint = this._point.destinationInfo[0].description = generateDescription();
    this.updateData(updatedPoint, true);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());

      this._editForm = this._element.querySelector(`.event--edit`);
      this._headerEditContainer = new PointHeaderEditView(this._point).getElement();
      render(this._editForm, this._headerEditContainer, RenderPosition.AFTERBEGIN);

      this._descriptionContainer = this._element.querySelector(`.event__section--destination`);
      this._description = new PointDescriptionView(this._point).getElement();
      render(this._descriptionContainer, this._description, RenderPosition.BEFOREEND);

      this._photos = new PointPhotosView(this._point).getElement();
      render(this._descriptionContainer, this._photos, RenderPosition.BEFOREEND);
    }

    return this._element;
  }

  _onFormSubmitClick(evt) {
    evt.preventDefault();
    this._callback.onFormSubmitClick(this._point);
  }

  setOnFormSubmitClick(callback) {
    this._callback.onFormSubmitClick = callback;
    this.getElement().querySelector(`.event--edit`).addEventListener(`submit`, this._onFormSubmitClick);
  }
}
