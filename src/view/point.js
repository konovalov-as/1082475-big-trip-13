import AbstractView from './abstract';
import dayjs from 'dayjs';
import he from 'he';

const Duration = {
  ONE_HOUR: 60,
  ONE_DAY: 1440,
};

const TWO_DIGITS = 10;

const convertDateTime = (diffDateTime) => {
  if (diffDateTime <= Duration.ONE_HOUR) {
    return `${diffDateTime < TWO_DIGITS ? `0${diffDateTime}M` : `${diffDateTime}M`}`;
  }
  if (diffDateTime > Duration.ONE_HOUR && diffDateTime <= Duration.ONE_DAY) {
    const hours = Math.trunc(diffDateTime / Duration.ONE_HOUR);
    const minutes = diffDateTime - (hours * Duration.ONE_HOUR);
    return `${hours < TWO_DIGITS ? `0${hours}` : `${hours}`}H
            ${minutes < TWO_DIGITS ? `0${minutes}` : `${minutes}`}M`;
  }
  const days = Math.trunc(diffDateTime / Duration.ONE_DAY);
  const hours = Math.trunc((diffDateTime - (days * Duration.ONE_DAY)) / Duration.ONE_HOUR);
  const minutes = (diffDateTime - (days * Duration.ONE_DAY)) - (hours * Duration.ONE_HOUR);
  return `${days < TWO_DIGITS ? `0${days}` : `${days}`}D
          ${hours < TWO_DIGITS ? `0${hours}` : `${hours}`}H
          ${minutes < TWO_DIGITS ? `0${minutes}` : `${minutes}`}M`;
};

const formatDateTime = (dateTimeStartEvent, dateTimeEndEvent) => {
  const eventDate = {};

  eventDate.dateStart = dateTimeStartEvent !== null
    ? dayjs(dateTimeStartEvent).format(`MMM DD`)
    : ``;

  eventDate.timeStart = dateTimeStartEvent !== null
    ? dayjs(dateTimeStartEvent).format(`HH:MM`)
    : ``;

  eventDate.timeEnd = dateTimeEndEvent !== null
    ? dayjs(dateTimeEndEvent).format(`HH:MM`)
    : ``;

  eventDate.machineDateStart = dateTimeStartEvent !== null
    ? dayjs(dateTimeStartEvent).format(`YYYY-MM-DD`)
    : ``;

  eventDate.machineDateTimeStart = dateTimeStartEvent !== null
    ? dayjs(dateTimeStartEvent).format(`YYYY-MM-DDTHH:MM`)
    : ``;

  eventDate.machineDateTimeEnd = dateTimeEndEvent !== null
    ? dayjs(dateTimeEndEvent).format(`YYYY-MM-DDTHH:MM`)
    : ``;

  return eventDate;
};

const createSelectedOfferTemplate = (offer) => {
  return `<li class="event__offer">
    <span class="event__offer-title">${offer.condition}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${he.encode(offer.cost.toString())}</span>
  </li>`;
};

const createPointTemplate = (point) => {
  const {pointType, destinationCity, dateTimeStartEvent, dateTimeEndEvent, cost, offers, isFavorite} = point;

  const eventDate = formatDateTime(dateTimeStartEvent, dateTimeEndEvent);

  const diffDateTime = (dateTimeStartEvent !== null && dateTimeEndEvent)
    ? dateTimeEndEvent.diff(dateTimeStartEvent, `minute`)
    : ``;

  const dateTime = convertDateTime(diffDateTime);

  const options = offers
  .map((offer) => createSelectedOfferTemplate(offer))
  .join(``);

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${eventDate.machineDateStart}">${eventDate.dateStart}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${pointType.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${pointType} ${destinationCity}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${eventDate.machineDateTimeStart}">${eventDate.timeStart}</time>
          &mdash;
          <time class="event__end-time" datetime="${eventDate.machineDateTimeEnd}">${eventDate.timeEnd}</time>
        </p>
        <p class="event__duration">${dateTime}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${he.encode(cost.toString())}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${options}
      </ul>
      <button class="event__favorite-btn ${isFavorite ? `event__favorite-btn--active` : ``}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

export default class Point extends AbstractView {
  constructor(point) {
    super();
    this._point = point;
    this._onRollupButtonClick = this._onRollupButtonClick.bind(this);
    this._onFavoriteClick = this._onFavoriteClick.bind(this);
    this._callback = {};
  }

  getTemplate() {
    return createPointTemplate(this._point);
  }

  _onRollupButtonClick(evt) {
    evt.preventDefault();
    this._callback.onRollupButtonClick();
  }

  setOnRollupButtonClick(callback) {
    this._callback.onRollupButtonClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._onRollupButtonClick);
  }

  _onFavoriteClick(evt) {
    evt.preventDefault();
    this._callback.onFavoriteClick();
  }

  setOnFavoriteClick(callback) {
    this._callback.onFavoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._onFavoriteClick);
  }
}
