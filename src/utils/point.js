import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore);

const getWeightWithoutDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortPointDateUp = (pointA, pointB) => {
  const weight = getWeightWithoutDate(pointA.dateTimeStartEvent, pointB.dateTimeStartEvent);

  if (weight !== null) {
    return weight;
  }

  return dayjs(pointA.dateTimeStartEvent).diff(dayjs(pointB.dateTimeStartEvent));
};

export const sortPointTimeMore = (pointA, pointB) => {
  const weightA = getWeightWithoutDate(pointA.dateTimeStartEvent, pointA.dateTimeEndEvent);
  const weightB = getWeightWithoutDate(pointB.dateTimeStartEvent, pointB.dateTimeEndEvent);

  if (weightA !== null) {
    return weightA;
  }
  if (weightB !== null) {
    return weightB;
  }

  const diffA = dayjs(pointA.dateTimeEndEvent).diff(dayjs(pointA.dateTimeStartEvent));
  const diffB = dayjs(pointB.dateTimeEndEvent).diff(dayjs(pointB.dateTimeStartEvent));

  if (diffA > diffB) {
    return -1;
  }
  if (diffA < diffB) {
    return 1;
  }
  return 0;
};

export const sortPointCostMore = (pointA, pointB) => {
  if (pointA.cost > pointB.cost) {
    return -1;
  }
  if (pointA.cost < pointB.cost) {
    return 1;
  }
  return 0;
};

export const isPointExpired = (endEventDate) => {
  return endEventDate === null ? false : dayjs().isAfter(endEventDate, `D`);
};

export const isPointUnexpired = (endStartDate) => {
  return endStartDate === null ? false : dayjs().isSameOrBefore(endStartDate, `D`);
};

export const adaptPhotosToClient = (photos) => {
  const readyPhotos = [];

  photos.map((photo) => {
    readyPhotos.push(Object.assign(
        {},
        photo,
        {
          src: photo.src,
          alt: photo.description,
        }
    ));
  });

  readyPhotos.map((photo) => delete photo.description);
  return readyPhotos;
};

export const adaptPhotosToServer = (photos) => {
  const readyPhotos = [];

  if (!photos.length) {
    return [];
  }

  photos.map((photo) => {
    readyPhotos.push({
      'src': photo.src,
      'description': photo.alt,
    });
  });

  return readyPhotos;
};

export const adaptOffersToClient = (offers) => {
  const readyOffers = [];

  offers.map((offer) => {
    readyOffers.push(Object.assign(
        {},
        offer,
        {
          condition: offer.title,
          cost: offer.price,
        }
    ));
  });

  readyOffers.map((offer) => {
    delete offer.title;
    delete offer.price;
  });

  return readyOffers;
};

export const adaptOffersToServer = (offers) => {
  const readyOffers = [];

  offers.map((offer) => {
    readyOffers.push(Object.assign(
        {},
        offer,
        {
          title: offer.condition,
          price: offer.cost,
        }
    ));
  });

  readyOffers.map((offer) => {
    delete offer.id;
    delete offer.cost;
    delete offer.condition;
  });

  return readyOffers;
};
