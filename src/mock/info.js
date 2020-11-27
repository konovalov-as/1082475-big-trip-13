import dayjs from 'dayjs';

const FROM_COST = 1;
const TO_COST = 500;

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateDate = () => {
  const FROM = 1;
  const TO = 30;
  const maxGap = getRandomInteger(FROM, TO);
  const gap = getRandomInteger(-maxGap, maxGap);
  return dayjs().add(gap, `day`).add(gap, `hours`);
};

const generateDestinationCity = () => {
  const destinationCity = [
    `London`,
    `San Francisco`,
    `Barcelona`,
    `Saint Petersburg`,
    `Helsinki`,
    `Copenhagen`,
    `Moscow`,
    `Hamburg`,
    `Milan`,
    `Vienna`,
  ];

  const randomIndex = getRandomInteger(0, destinationCity.length - 1);

  return destinationCity[randomIndex];
};

const generateDestinationCities = () => {
  const quantityCities = getRandomInteger(1, 5);
  let cities = [];

  for (let index = 0; index < quantityCities; index++) {
    cities.push(generateDestinationCity());
  }

  return cities;
};

export const generateInfo = () => {
  const dateTimeStartEvent = generateDate();
  let dateTimeEndEvent = generateDate();

  while (dateTimeStartEvent.isAfter(dateTimeEndEvent)) {
    dateTimeEndEvent = generateDate();
  }

  return {
    destinationCities: generateDestinationCities(),
    dateTimeStartEvent,
    dateTimeEndEvent,
    cost: getRandomInteger(FROM_COST, TO_COST),
  };
};
