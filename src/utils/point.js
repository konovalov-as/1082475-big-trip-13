import dayjs from 'dayjs';
// Функция помещает точки без даты в конце списка,
// возвращая нужный вес для колбэка sort
const getWeightForNullDate = (dateA, dateB) => {
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

export const sortPointOlder = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dueDate, pointB.dueDate);

  if (weight !== null) {
    return weight;
  }

  return dayjs(pointA.dueDate).diff(dayjs(pointB.dueDate));
};

export const sortPointNewer = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dueDate, pointB.dueDate);

  if (weight !== null) {
    return weight;
  }

  return dayjs(pointB.dueDate).diff(dayjs(pointA.dueDate));
};

export const isPointExpired = (endEventDate) => {
  return endEventDate === null ? false : dayjs().isAfter(endEventDate, `D`);
};

export const isPointUnexpired = (endStartDate) => {
  return endStartDate === null ? false : dayjs().isBefore(endStartDate, `D`);
};
