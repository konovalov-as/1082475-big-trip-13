import dayjs from 'dayjs';
import {getRandomInteger} from '../utils/common';
import {OfferCost, DateGap} from '../const';
import {DESTINATION_CITIES} from '../const';
import {POINT_TYPES} from '../const';

const generatePointTypes = () => {
  const randomIndex = getRandomInteger(0, POINT_TYPES.length - 1);

  return POINT_TYPES[randomIndex];
};

const generateDestinationCity = () => {
  const randomIndex = getRandomInteger(0, DESTINATION_CITIES.length - 1);

  return DESTINATION_CITIES[randomIndex];
};

const generateOffers = () => {
  const offers = [{
    id: 1,
    condition: `Add luggage`,
    cost: getRandomInteger(OfferCost.FROM, OfferCost.TO),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 2,
    condition: `Rent a car`,
    cost: getRandomInteger(OfferCost.FROM, OfferCost.TO),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 3,
    condition: `Add breakfast`,
    cost: getRandomInteger(OfferCost.FROM, OfferCost.TO),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 4,
    condition: `Book tickets`,
    cost: getRandomInteger(OfferCost.FROM, OfferCost.TO),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 5,
    condition: `Switch to comfort`,
    cost: getRandomInteger(OfferCost.FROM, OfferCost.TO),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 6,
    condition: `Order Uber`,
    cost: getRandomInteger(OfferCost.FROM, OfferCost.TO),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 7,
    condition: `Add meal`,
    cost: getRandomInteger(OfferCost.FROM, OfferCost.TO),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 8,
    condition: `Choose seats`,
    cost: getRandomInteger(OfferCost.FROM, OfferCost.TO),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 9,
    condition: `Lunch in city`,
    cost: getRandomInteger(OfferCost.FROM, OfferCost.TO),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  {
    id: 10,
    condition: `Travel by train`,
    cost: getRandomInteger(OfferCost.FROM, OfferCost.TO),
    isChecked: Boolean(getRandomInteger(0, 1)),
  },
  ];

  const offersCount = getRandomInteger(0, 5);

  const generateCondition = () => {
    const randomIndex = getRandomInteger(0, offers.length - 1);
    return offers[randomIndex];
  };

  const options = new Set(new Array(offersCount).fill().map(generateCondition));
  return options;
};

const generatePhotos = () => {
  const photosCount = getRandomInteger(0, 10);

  const generatePhoto = () => {
    return `http://picsum.photos/248/152?r=${Math.random()}`;
  };
  const photos = new Array(photosCount).fill().map(generatePhoto);

  return photos;
};

const generateDate = () => {
  const maxDaysGap = getRandomInteger(DateGap.FROM, DateGap.TO);
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const maxHoursGap = getRandomInteger(DateGap.FROM, DateGap.TO);
  const hoursGap = getRandomInteger(-maxHoursGap, maxHoursGap);
  const maxMinutesGap = getRandomInteger(DateGap.FROM, DateGap.TO);
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
    destinationCity: generateDestinationCity(),
    offers: generateOffers(),
    destinationInfo: [{
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
      photos: generatePhotos(),
    }],
    dateTimeStartEvent,
    dateTimeEndEvent,
    cost: getRandomInteger(OfferCost.FROM, OfferCost.TO),
  };
};
