import AbstractView from './abstract';
import dayjs from 'dayjs';
import {createSelectedOfferTemplate} from './selected-offers';

const createPointTemplate = (point) => {
  const {pointType, destinationCity, dateTimeStartEvent, dateTimeEndEvent, cost, offers} = point;

  const dateStart = dateTimeStartEvent !== null
    ? dayjs(dateTimeStartEvent).format(`MMM DD`)
    : ``;

  const timeStart = dateTimeStartEvent !== null
    ? dayjs(dateTimeStartEvent).format(`HH:MM`)
    : ``;

  const timeEnd = dateTimeEndEvent !== null
    ? dayjs(dateTimeEndEvent).format(`HH:MM`)
    : ``;

  const machineDateStart = dateTimeStartEvent !== null
    ? dayjs(dateTimeStartEvent).format(`YYYY-MM-DD`)
    : ``;

  const machineDateTimeStart = dateTimeStartEvent !== null
    ? dayjs(dateTimeStartEvent).format(`YYYY-MM-DDTHH:MM`)
    : ``;

  const machineDateTimeEnd = dateTimeEndEvent !== null
    ? dayjs(dateTimeEndEvent).format(`YYYY-MM-DDTHH:MM`)
    : ``;

  const diffDateTime = (dateTimeStartEvent !== null && dateTimeEndEvent)
    ? dateTimeEndEvent.diff(dateTimeStartEvent, `minute`)
    : ``;

  let dateTime = 0;
  const ONE_HOUR = 60;
  const ONE_DAY = 1440;
  const TWO_DIGITS = 10;

  if (diffDateTime <= ONE_HOUR) {
    dateTime = `${diffDateTime < TWO_DIGITS ? `0${diffDateTime}M` : `${diffDateTime}M`}`;
  } else if (diffDateTime > ONE_HOUR && diffDateTime <= ONE_DAY) {
    const hours = Math.trunc(diffDateTime / ONE_HOUR);
    const minutes = diffDateTime - (hours * ONE_HOUR);
    dateTime = `${hours < TWO_DIGITS ? `0${hours}` : `${hours}`}H
                ${minutes < TWO_DIGITS ? `0${minutes}` : `${minutes}`}M`;
  } else if (diffDateTime > ONE_DAY) {
    const days = Math.trunc(diffDateTime / ONE_DAY);
    const hours = Math.trunc((diffDateTime - (days * ONE_DAY)) / ONE_HOUR);
    const minutes = (diffDateTime - (days * ONE_DAY)) - (hours * ONE_HOUR);
    dateTime = `${days < TWO_DIGITS ? `0${days}` : `${days}`}D
                ${hours < TWO_DIGITS ? `0${hours}` : `${hours}`}H
                ${minutes < TWO_DIGITS ? `0${minutes}` : `${minutes}`}M`;
  }

  let options = ``;
  for (const offer of offers) {
    options += createSelectedOfferTemplate(offer);
  }

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${machineDateStart}">${dateStart}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${pointType}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${pointType} ${destinationCity}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${machineDateTimeStart}">${timeStart}</time>
          &mdash;
          <time class="event__end-time" datetime="${machineDateTimeEnd}">${timeEnd}</time>
        </p>
        <p class="event__duration">${dateTime}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${cost}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${options}
      </ul>
      <button class="event__favorite-btn" type="button">
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
  }

  getTemplate() {
    return createPointTemplate(this._point);
  }
}
