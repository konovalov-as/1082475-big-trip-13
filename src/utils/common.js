import dayjs from 'dayjs';

const Duration = {
  ONE_HOUR: 60,
  ONE_DAY: 1440,
};

const TWO_DIGITS = 10;

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const isOnline = () => {
  return window.navigator.onLine;
};

export const convertDateTime = (diffDateTime) => {
  if (diffDateTime < Duration.ONE_HOUR) {
    return `${diffDateTime < TWO_DIGITS ? `0${diffDateTime}M` : `${diffDateTime}M`}`;
  }
  if (diffDateTime >= Duration.ONE_HOUR && diffDateTime < Duration.ONE_DAY) {
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

export const formatDateTime = (dateTimeStartEvent, dateTimeEndEvent) => {
  const eventDate = {};

  eventDate.dateStart = dateTimeStartEvent !== null
    ? dayjs(dateTimeStartEvent).format(`MMM DD`)
    : ``;

  eventDate.timeStart = dateTimeStartEvent !== null
    ? dayjs(dateTimeStartEvent).format(`HH:mm`)
    : ``;

  eventDate.timeEnd = dateTimeEndEvent !== null
    ? dayjs(dateTimeEndEvent).format(`HH:mm`)
    : ``;

  eventDate.machineDateStart = dateTimeStartEvent !== null
    ? dayjs(dateTimeStartEvent).format(`YYYY-MM-DD`)
    : ``;

  eventDate.machineDateTimeStart = dateTimeStartEvent !== null
    ? dayjs(dateTimeStartEvent).format(`YYYY-MM-DDTHH:mm`)
    : ``;

  eventDate.machineDateTimeEnd = dateTimeEndEvent !== null
    ? dayjs(dateTimeEndEvent).format(`YYYY-MM-DDTHH:mm`)
    : ``;

  return eventDate;
};
