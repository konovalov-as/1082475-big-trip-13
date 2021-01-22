import {sortPointDateUp} from './point';
import dayjs from 'dayjs';

const BLANK_INFO = {
  destinationCities: `Cities list is empty`,
  eventDate: ``,
  cost: 0,
};

const createTitle = (sortPoints) => {
  const length = sortPoints.length;

  switch (length) {
    case 1:
      return `${sortPoints[0].destinationCity}`;
    case 2:
      return `${sortPoints[0].destinationCity} — ${sortPoints[1].destinationCity}`;
    case 3:
      return `${sortPoints[0].destinationCity} — ${sortPoints[1].destinationCity} — ${sortPoints[2].destinationCity}`;
    default:
      return `${sortPoints[0].destinationCity} — ... — ${sortPoints[length - 1].destinationCity}`;
  }
};

export const createCost = (sortPoints) => {
  return sortPoints.reduce((totalCost, currentPoint) => {
    const totalOffersCost = currentPoint.offers
      ? currentPoint.offers.reduce((offersTotal, currentOffer) => (offersTotal + currentOffer.cost), 0)
      : 0;
    return totalCost + currentPoint.cost + totalOffersCost;
  }, 0);
};

export const createDate = (sortPoints) => {
  const eventStart = sortPoints[0].dateTimeStartEvent;
  const eventEnd = sortPoints[sortPoints.length - 1].dateTimeEndEvent;

  return `${dayjs(eventStart).format(`DD MMM`)} — ${dayjs(eventEnd).format(`DD MMM`)}`;
};

export const createInfo = (points) => {
  if (points.length === 0) {
    return BLANK_INFO;
  }

  const sortPoints = points.slice().sort(sortPointDateUp);

  return {
    destinationCities: createTitle(sortPoints),
    eventDate: createDate(sortPoints),
    cost: createCost(sortPoints),
  };
};
