import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const FROM_COST = 1;
const TO_COST = 500;

const generatePointTypes = () => {
  const pointTypes = [
    `Taxi`,
    `Bus`,
    `Train`,
    `Ship`,
    `Transport`,
    `Drive`,
    `Flight`,
    `Check-in`,
    `Sightseeing`,
    `Restaurant`,
  ];

  const randomIndex = getRandomInteger(0, pointTypes.length - 1);

  return pointTypes[randomIndex];
};

const generateDestinationCities = () => {
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

const generateOffers = () => {
  const offers = [{
    id: 1,
    condition: `Add luggage`,
    cost: getRandomInteger(FROM_COST, TO_COST),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 2,
    condition: `Rent a car`,
    cost: getRandomInteger(FROM_COST, TO_COST),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 3,
    condition: `Add breakfast`,
    cost: getRandomInteger(FROM_COST, TO_COST),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 4,
    condition: `Book tickets`,
    cost: getRandomInteger(FROM_COST, TO_COST),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 5,
    condition: `Switch to comfort`,
    cost: getRandomInteger(FROM_COST, TO_COST),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 6,
    condition: `Order Uber`,
    cost: getRandomInteger(FROM_COST, TO_COST),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 7,
    condition: `Add meal`,
    cost: getRandomInteger(FROM_COST, TO_COST),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 8,
    condition: `Choose seats`,
    cost: getRandomInteger(FROM_COST, TO_COST),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 9,
    condition: `Lunch in city`,
    cost: getRandomInteger(FROM_COST, TO_COST),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 10,
    condition: `Travel by train`,
    cost: getRandomInteger(FROM_COST, TO_COST),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  ];

  const quantity = getRandomInteger(0, 5);

  const generateCondition = () => {
    const randomIndex = getRandomInteger(0, offers.length - 1);
    return offers[randomIndex];
  };

  const options = new Set(new Array(quantity).fill().map(generateCondition));
  return options;
};

const generatePhotos = () => {
  const quantity = getRandomInteger(0, 10);

  const generatePhoto = () => {
    return `http://picsum.photos/248/152?r=${Math.random()}`;
  };
  const photos = new Array(quantity).fill().map(generatePhoto);

  return photos;
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

export const generateOptions = generateOffers;

export const generatePoint = () => {
  const dateTimeStartEvent = generateDate();
  let dateTimeEndEvent = generateDate();

  while ((dateTimeStartEvent.isAfter(dateTimeEndEvent) && !(dayjs(dateTimeStartEvent).isSame(dayjs(dateTimeEndEvent))))) {
    dateTimeEndEvent = generateDate();
  }

  return {
    pointType: generatePointTypes(),
    destinationCity: generateDestinationCities(),
    offers: generateOffers(),
    destinationInfo: [{
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
      photos: generatePhotos(),
    }],
    dateTimeStartEvent,
    dateTimeEndEvent,
    cost: getRandomInteger(FROM_COST, TO_COST),
  };
};
