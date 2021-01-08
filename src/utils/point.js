import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore);

// Функция помещает точки без даты в конце списка,
// возвращая нужный вес для колбэка sort
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
