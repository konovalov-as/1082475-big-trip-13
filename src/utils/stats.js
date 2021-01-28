import dayjs from 'dayjs';

const getCountDays = (minutes) => {
  return Math.ceil(minutes / 1440);
};

export const getLabels = (points) => {
  const labels = points.map((point) => point.pointType.toUpperCase());
  return [...new Set(labels)];
};

export const getData = (labels, points) => {
  const money = [];
  const countTypes = [];
  const countDays = [];

  labels.map((label) => {
    let cost = 0;
    let count = 0;
    let countMinutes = 0;

    points
      .filter((point) => point.pointType.toUpperCase() === label)
      .map((point) => {
        cost += point.cost;
        count++;
        countMinutes += dayjs(point.dateTimeEndEvent).diff(point.dateTimeStartEvent, `minute`);
      });

    money.push(cost);
    countTypes.push(count);
    countDays.push(getCountDays(countMinutes));
  });

  return [money, countTypes, countDays];
};
