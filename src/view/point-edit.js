import SmartView from './smart';
import dayjs from 'dayjs';

import he from 'he';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const FormattingToken = {
  DAY_MONTH_YEAR_HOURS_MIN: `d/m/Y H:i`,
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

const createPointHeaderTemplate = (point, offers, destinations) => {
  const {pointType, destinationCity, dateTimeStartEvent, dateTimeEndEvent, cost, isWrongCity, isDisabled, isSaving, isDeleting} = point;

  const dateStart = dateTimeStartEvent !== null
    ? dayjs(dateTimeStartEvent).format(`DD/MM/YYYY HH:mm`)
    : ``;

  const dateEnd = dateTimeEndEvent !== null
    ? dayjs(dateTimeEndEvent).format(`DD/MM/YYYY HH:mm`)
    : ``;

  const pointsTypeList = offers
  .map((offer) => createPointTemplate(offer.pointType))
  .join(``);

  const citiesList = destinations
  .map((destination) => createDestinationCityTemplate(destination.name))
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
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${he.encode(cost.toString())}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisabled || isDisabled ? `disabled` : ``}>${isSaving ? `Saving...` : `Save`}</button>
    <button class="event__reset-btn" type="reset" ${isDisabled ? `disabled` : ``}>${isDeleting ? `Deleting...` : `Delete`}</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>`;
};

const createOfferTemplate = (offer) => {
  return `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.condition}-1" type="checkbox" name="event-offer-${offer.condition}" ${offer.isChecked ? `checked` : ``} value="${offer.condition}">
  <label class="event__offer-label" for="event-offer-${offer.condition}-1">
    <span class="event__offer-title">${offer.condition}</span>
    &plus;&euro;&nbsp;
  <span class="event__offer-price">${he.encode(offer.cost.toString())}</span>
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
  return `<img class="event__photo" src="${photo.src}" alt="${photo.alt}">`;
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

const createPointEditTemplate = (data, offers, destinations, offersForPoint) => {
  const pointHeaderTemplate = createPointHeaderTemplate(data, offers, destinations);
  const offersTemplate = createOffersTemplate(offersForPoint);
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
  constructor(point, offers, destinations, newEventButton) {
    super();
    this._data = PointEdit.parsePointToData(point);
    this._offers = offers;
    this._offersForPoint = this._data.offers;
    this._destinations = destinations;
    this._datepicker = null;

    this._newEventButton = newEventButton;
    this._submitButton = this.getElement().querySelector(`.event__save-btn`);

    this._onFormSubmitClick = this._onFormSubmitClick.bind(this);
    this._onFormDeleteClick = this._onFormDeleteClick.bind(this);
    this._onEditFormClose = this._onEditFormClose.bind(this);
    this._callback = {};

    this._onPointTypeChange = this._onPointTypeChange.bind(this);
    this._onDestinationChange = this._onDestinationChange.bind(this);
    this._onCostChange = this._onCostChange.bind(this);
    this._onOfferChange = this._onOfferChange.bind(this);
    this._onStartDateChange = this._onStartDateChange.bind(this);
    this._onEndDateChange = this._onEndDateChange.bind(this);

    this._setListeners();
    this._setDatepicker();
  }

  reset(point) {
    this._offersForPoint = point.offers;
    this.updateData(
        PointEdit.parsePointToData(point)
    );
  }

  getTemplate() {
    return createPointEditTemplate(this._data, this._offers, this._destinations, this._offersForPoint);
  }

  restoreOn() {
    this._setListeners();
    this._setDatepicker();
    this.setOnFormSubmitClick(this._callback.onFormSubmitClick);
    this.setOnFormDeleteClick(this._callback.onFormDeleteClick);
    this.setOnEditFormClose(this._callback.onEditFormClose);
  }

  _destroyDatepicker() {
    this._datepicker.start.destroy();
    this._datepicker.end.destroy();
    this._datepicker = null;
  }

  _setDatepicker() {
    if (this._datepicker) {
      this._destroyDatepicker();
    }

    const [startDateInput, endDateInput] = Array.from(this.getElement().querySelectorAll(`.event__input--time`));

    this._datepicker = {
      start: flatpickr(startDateInput, {
        enableTime: true,
        dateFormat: FormattingToken.DAY_MONTH_YEAR_HOURS_MIN,
        defaultDate: this._data.dateTimeStartEvent.toDate(),
        onChange: this._onStartDateChange,
      }),
      end: flatpickr(endDateInput, {
        enableTime: true,
        dateFormat: FormattingToken.DAY_MONTH_YEAR_HOURS_MIN,
        defaultDate: this._data.dateTimeEndEvent.toDate(),
        onChange: this._onEndDateChange,
      }),
    };
  }

  _onStartDateChange([userDate]) {
    this.updateData({dateTimeStartEvent: dayjs(userDate)}, true);
    this._datepicker.end.set(`minDate`, userDate);
  }

  _onEndDateChange([userDate]) {
    this.updateData({dateTimeEndEvent: dayjs(userDate)}, true);
    this._datepicker.start.set(`maxDate`, userDate);
  }

  _setListeners() {
    this.getElement()
      .querySelector(`.event__type-list`)
      .addEventListener(`click`, this._onPointTypeChange);
    this.getElement()
      .querySelector(`#event-destination-1`)
      .addEventListener(`input`, this._onDestinationChange);
    this.getElement()
      .querySelector(`#event-price-1`)
      .addEventListener(`input`, this._onCostChange);
    this.setOnOfferChange();
  }

  _getOffers(targetOffer) {
    const sourceOffer = this._offers.find((offer) => {
      return offer.pointType === targetOffer;
    });

    return sourceOffer.offers;
  }

  _onPointTypeChange(evt) {
    if (evt.target.matches(`input.event__type-input`)) {
      evt.preventDefault();
      this._offersForPoint = this._getAvailableOffers(evt.target.value);
      this.updateData({
        offers: [],
        pointType: evt.target.value,
      });
    }
  }

  _onDestinationChange(evt) {
    evt.preventDefault();

    this._destinations.find((destination) => {
      if (destination.name !== evt.target.value) {
        evt.target.setCustomValidity(`It's necessary to choose the city from the list`);
        this._submitButton.disabled = true;
        return;
      }

      this.updateData({
        destinationCity: evt.target.value,
        destinationInfo: Object.assign(
            {},
            this._data.destinationInfo,
            {
              description: destination.destinationInfo.description,
              photos: destination.destinationInfo.photos,
            }
        )
      });
      const destinationInput = this.getElement().querySelector(`.event__input--destination`);
      destinationInput.focus();
    });
  }

  _onCostChange(evt) {
    evt.preventDefault();
    const target = evt.target;
    const costNumber = parseInt(target.value, 10);
    if (!Number.isInteger(costNumber)) {
      target.setCustomValidity(`Cost is an integer`);
      this._submitButton.disabled = true;
      return;
    }
    if (costNumber < 0) {
      target.setCustomValidity(`Cost is a positive number`);
      this._submitButton.disabled = true;
      return;
    }
    target.setCustomValidity(``);
    this._submitButton.disabled = false;

    this.updateData({
      cost: evt.target.value,
    }, true);
  }

  _getAvailableOffers(pointType) {
    for (const offer of this._offers) {
      if (pointType === offer.pointType) {
        return offer.offers;
      }
    }
    return [];
  }

  _onOfferChange(evt) {
    evt.preventDefault();
    const offerTitle = evt.target.value;
    let currentOffers = this._offersForPoint;

    const diffOffers = currentOffers.map((currentOffer) => {
      return currentOffer.condition === offerTitle ?
        Object.assign(
            {},
            currentOffer,
            {
              isChecked: !currentOffer.isChecked
            }
        ) : currentOffer;
    });

    this._offersForPoint = diffOffers;

    const checkedOffers = diffOffers.reduce((result, offer) => {

      if (offer.isChecked) {
        result.push(offer);
      }
      return result;

    }, []);

    this.updateData({
      offers: checkedOffers
    }, true);
  }

  setOnOfferChange() {
    const offersContainer = this.getElement().querySelector(`.event__available-offers`);
    if (offersContainer) {
      offersContainer.addEventListener(`change`, this._onOfferChange);
    }
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
    this._newEventButton.disabled = false;
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
          isDisabled: false,
          isSaving: false,
          isDeleting: false,
        }
    );
  }

  static parseDataToPoint(data) {
    const pointData = Object.assign(
        {},
        data,
        {
          dateTimeStartEvent: dayjs(data.dateTimeStartEvent),
          dateTimeEndEvent: dayjs(data.dateTimeEndEvent),
        }
    );

    delete pointData.isWrongCity;
    delete pointData.isRepeating;
    delete pointData.isDisabled;
    delete pointData.isSaving;
    delete pointData.isDeleting;

    return pointData;
  }
}
