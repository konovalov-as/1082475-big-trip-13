import SmartView from './smart';
import dayjs from 'dayjs';

import {POINT_TYPES, DESTINATION_CITIES} from '../const';
import {generateOffers, generateDescription, generatePhotos} from '../mock/point';

const BLANK_POINT = {
  pointType: POINT_TYPES[0],
  destinationCity: DESTINATION_CITIES[0],
  offers: generateOffers(),
  destinationInfo: {
    description: generateDescription(),
    photos: generatePhotos(),
  },
  dateTimeStartEvent: null,
  dateTimeEndEvent: null,
  cost: 0,
  isFavorite: false,
};

const createPointTemplate = (pointType) => {
  return `<div class="event__type-item">
  <input id="event-type-${pointType.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType.toLowerCase()}">
  <label class="event__type-label event__type-label--${pointType.toLowerCase()}" for="event-type-${pointType.toLowerCase()}-1">${pointType}</label>
</div>`;
};

const createDestinationCityTemplate = (destinationCity) => {
  return `<option value="${destinationCity}"></option>`;
};

const createPointHeaderTemplate = (point) => {
  const {pointType, destinationCity, dateTimeStartEvent, dateTimeEndEvent, cost, isWrongCity} = point;

  const dateStart = dateTimeStartEvent !== null
    ? dayjs(dateTimeStartEvent).format(`DD/MM/YY HH:mm`)
    : ``;

  const dateEnd = dateTimeEndEvent !== null
    ? dayjs(dateTimeEndEvent).format(`DD/MM/YY HH:mm`)
    : ``;

  const pointsTypeList = POINT_TYPES
  .map((pointTypeItem) => createPointTemplate(pointTypeItem))
  .join(``);

  const citiesList = DESTINATION_CITIES
  .map((destinationCityItem) => createDestinationCityTemplate(destinationCityItem))
  .join(``);

  const isSubmitDisabled = isWrongCity;

  return `<header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${pointType.toLowerCase()}.png" alt="Event type icon"
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${pointsTypeList}
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${pointType}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationCity}" list="destination-list-1">
      <datalist id="destination-list-1">
        ${citiesList}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateStart}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateEnd}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${cost}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisabled ? `disabled` : ``}>Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>`;
};

const createOfferTemplate = (offer) => {
  return `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.condition}-1" type="checkbox" name="event-offer-${offer.condition}" ${offer.isChecked ? `checked` : ``}>
  <label class="event__offer-label" for="event-offer-${offer.condition}-1">
    <span class="event__offer-title">${offer.condition}</span>
    &plus;&euro;&nbsp;
  <span class="event__offer-price">${offer.cost}</span>
  </label>
</div>`;
};

const createOffersTemplate = (offers) => {
  if (offers.length !== 0) {
    const availableOffers = offers
    .map((offer) => createOfferTemplate(offer))
    .join(``);
    return `<div class="event__available-offers">${availableOffers}</div>`;
  }
  return ``;
};

const createOffersContainerTemplate = (offersTemplate) => {
  if (offersTemplate !== ``) {
    return `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    ${offersTemplate}
    </section>`;
  }
  return ``;
};

const createDestinationTemplate = (description) => {
  if (description !== ``) {
    return `<p class="event__destination-description">${description}</p>`;
  }
  return ``;
};

const createPhotoTemplate = (photo) => {
  return `<img class="event__photo" src="${photo}" alt="Event photo">`;
};

const createPhotosTemplate = (photos) => {
  if (photos.length !== 0) {
    const photosList = photos
    .map((photo) => createPhotoTemplate(photo))
    .join(``);

    return `<div class="event__photos-container">
      <div class="event__photos-tape">
      ${photosList}
      </div>
    </div>`;
  }
  return ``;
};

const createDestinationContainerTemplate = (destinationTemplate, photosTemplate) => {
  if (destinationTemplate !== `` || photosTemplate !== ``) {
    return `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    ${destinationTemplate}
    ${photosTemplate}
    </section>`;
  }
  return ``;
};

const createPointDetailsContainerTemplate = (offersContainerTemplate, destinationContainerTemplate) => {
  if (offersContainerTemplate !== `` || destinationContainerTemplate !== ``) {
    return `<section class="event__details">
    ${offersContainerTemplate}
    ${destinationContainerTemplate}
    </section>`;
  }
  return ``;
};

const createPointEditTemplate = (data) => {
  const pointHeaderTemplate = createPointHeaderTemplate(data);
  const offersTemplate = createOffersTemplate(data.offers);
  const offersContainerTemplate = createOffersContainerTemplate(offersTemplate);
  const destinationTemplate = createDestinationTemplate(data.destinationInfo.description);
  const photosTemplate = createPhotosTemplate(data.destinationInfo.photos);
  const destinationContainerTemplate = createDestinationContainerTemplate(destinationTemplate, photosTemplate);
  const pointDetailsContainerTemplate = createPointDetailsContainerTemplate(offersContainerTemplate, destinationContainerTemplate);

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    ${pointHeaderTemplate}
    ${pointDetailsContainerTemplate}
  </form>
  </li>`;
};

export default class PointEdit extends SmartView {
  constructor(point = BLANK_POINT) {
    super();
    this._data = PointEdit.parsePointToData(point);

    this._onFormSubmitClick = this._onFormSubmitClick.bind(this);
    this._onFormDeleteClick = this._onFormDeleteClick.bind(this);
    this._callback = {};

    this._onPointTypeChange = this._onPointTypeChange.bind(this);
    this._onDestinationChange = this._onDestinationChange.bind(this);
    this._onDateStartChange = this._onDateStartChange.bind(this);
    this._onDateEndChange = this._onDateEndChange.bind(this);
    this._onCostChange = this._onCostChange.bind(this);
    this._onEditFormClose = this._onEditFormClose.bind(this);

    this._setListeners();
  }

  reset(point) {
    this.updateData(
        PointEdit.parsePointToData(point)
    );
  }

  getTemplate() {
    return createPointEditTemplate(this._data);
  }

  restoreOn() {
    this._setListeners();
    this.setOnFormSubmitClick(this._callback.onFormSubmitClick);
    this.setOnFormDeleteClick(this._callback.onFormDeleteClick);
  }

  _setListeners() {
    this.getElement()
      .querySelector(`.event__type-list`)
      .addEventListener(`click`, this._onPointTypeChange);
    this.getElement()
      .querySelector(`#event-destination-1`)
      .addEventListener(`input`, this._onDestinationChange);
    this.getElement()
      .querySelector(`#event-start-time-1`)
      .addEventListener(`input`, this._onDateStartChange);
    this.getElement()
      .querySelector(`#event-end-time-1`)
      .addEventListener(`input`, this._onDateEndChange);
    this.getElement()
      .querySelector(`#event-price-1`)
      .addEventListener(`input`, this._onCostChange);
  }

  _onPointTypeChange(evt) {
    if (evt.target.matches(`input.event__type-input`)) {
      evt.preventDefault();
      this.updateData({
        offers: generateOffers(),
        pointType: evt.target.value,
      });
    }
  }

  _onDestinationChange(evt) {
    evt.preventDefault();
    DESTINATION_CITIES.find((destinationCity) => {
      if (destinationCity === evt.target.value) {
        this.updateData({
          isWrongCity: false,
          destinationCity: evt.target.value,
          destinationInfo: Object.assign(
              {},
              this._data.destinationInfo,
              {description: evt.target.value + generateDescription()}
          )
        }, true);
      } else {
        this.updateData({
          isWrongCity: true,
        }, true);
      }
    });
  }

  _onDateStartChange(evt) {
    evt.preventDefault();
    this.updateData({
      dateTimeStartEvent: evt.target.value,
    }, true);
  }

  _onDateEndChange(evt) {
    evt.preventDefault();
    this.updateData({
      dateTimeEndEvent: evt.target.value,
    }, true);
  }

  _onCostChange(evt) {
    evt.preventDefault();
    this.updateData({
      cost: evt.target.value,
    }, true);
  }

  _onEditFormClose(evt) {
    evt.preventDefault();
    this._callback.onEditFormClose();
  }

  setOnEditFormClose(callback) {
    this._callback.onEditFormClose = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._onEditFormClose);
  }

  _onFormSubmitClick(evt) {
    evt.preventDefault();
    this._callback.onFormSubmitClick(PointEdit.parseDataToPoint(this._data));
  }

  setOnFormSubmitClick(callback) {
    this._callback.onFormSubmitClick = callback;
    this.getElement().querySelector(`.event--edit`).addEventListener(`submit`, this._onFormSubmitClick);
  }

  _onFormDeleteClick(evt) {
    evt.preventDefault();
    this._callback.onFormDeleteClick(PointEdit.parseDataToPoint(this._data));
  }

  setOnFormDeleteClick(callback) {
    this._callback.onFormDeleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._onFormDeleteClick);
  }

  static parsePointToData(point) {
    return Object.assign(
        {},
        point,
        {
          isWrongCity: false,
        }
    );
  }

  static parseDataToPoint(data) {
    const pointData = Object.assign({}, data);

    delete pointData.isWrongCity;
    delete pointData.isRepeating;

    return pointData;
  }
}
