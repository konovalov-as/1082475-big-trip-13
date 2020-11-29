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
  const TO = 7;
  const maxDaysGap = getRandomInteger(FROM, TO);
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const maxHoursGap = getRandomInteger(FROM, TO);
  const hoursGap = getRandomInteger(-maxHoursGap, maxHoursGap);
  const maxMinutesGap = getRandomInteger(FROM, TO);
  const minutesGap = getRandomInteger(-maxMinutesGap, maxMinutesGap);
  return dayjs().add(daysGap, `day`).add(hoursGap, `hours`).add(minutesGap, `minutes`);
};

const generateDestinationCity = () => {
  const destinationCities = [
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

  const randomIndex = getRandomInteger(0, destinationCities.length - 1);

  return destinationCities[randomIndex];
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

  while ((dateTimeStartEvent.isAfter(dateTimeEndEvent) && !(dayjs(dateTimeStartEvent).isSame(dayjs(dateTimeEndEvent))))) {
    dateTimeEndEvent = generateDate();
  }

  return {
    destinationCities: generateDestinationCities(),
    dateTimeStartEvent,
    dateTimeEndEvent,
    cost: getRandomInteger(FROM_COST, TO_COST),
  };
};
