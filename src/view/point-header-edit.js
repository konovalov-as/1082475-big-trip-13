import AbstractView from './abstract';
import dayjs from 'dayjs';
import {DESTINATION_CITIES} from '../const';
import {POINT_TYPES} from '../const';

const createPointTemplate = (pointType) => {
  return `<div class="event__type-item">
  <input id="event-type-${pointType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}">
  <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-1" style="::before">${pointType}</label>
</div>`;
};

const createDestinationCityTemplate = (destinationCity) => {
  return `<option value="${destinationCity}"></option>`;
};

const createPointHeaderEditTemplate = (point) => {
  const {pointType, destinationCity, dateTimeStartEvent, dateTimeEndEvent, cost} = point;

  const dateStart = dateTimeStartEvent !== null
    ? dayjs(dateTimeStartEvent).format(`DD/MM/YY HH:mm`)
    : ``;

  const dateEnd = dateTimeEndEvent !== null
    ? dayjs(dateTimeEndEvent).format(`DD/MM/YY HH:mm`)
    : ``;


  let pointsTypeList = POINT_TYPES
  .map((pointTypeItem) => createPointTemplate(pointTypeItem))
  .join(``);

  let citiesList = DESTINATION_CITIES
  .map((destinationCityItem) => createDestinationCityTemplate(destinationCityItem))
  .join(``);

  return `<header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${pointType}.png" alt="Event type icon">
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

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>`;
};

export default class PointHeaderEdit extends AbstractView {
  constructor(point) {
    super();
    this._point = point;
  }

  getTemplate() {
    return createPointHeaderEditTemplate(this._point);
  }
}
