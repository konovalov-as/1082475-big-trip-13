import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
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

const conditions = [`Add luggage`, `Rent a car`, `Add breakfast`, `Book tickets`, `Switch to comfort`, `Order Uber`, `Add meal`, `Choose seats`, `Lunch in city`, `Travel by train`];

const generateOffer = () => {
  const randomIndex = getRandomInteger(0, conditions.length - 1);
  return {
    id: nanoid(),
    condition: conditions[randomIndex],
    cost: getRandomInteger(OfferCost.FROM, OfferCost.TO),
    isChecked: Boolean(getRandomInteger(0, 1)),
  };
};

export const generateOffers = () => {
  const offersCount = getRandomInteger(0, 5);
  const offers = [];

  for (let offerIndex = 0; offerIndex < offersCount; offerIndex++) {
    offers.push(generateOffer());
  }

  return offers;
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

const descriptions = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra.`, `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`];

export const generateDescription = () => {
  const descriptionsCount = getRandomInteger(0, 5);

  return descriptions.slice(0, descriptionsCount).join(``);
};

export const generatePoint = () => {
  const dateTimeStartEvent = generateDate();
  let dateTimeEndEvent = generateDate();

  while ((dateTimeStartEvent.isAfter(dateTimeEndEvent) && !(dayjs(dateTimeStartEvent).isSame(dayjs(dateTimeEndEvent))))) {
    dateTimeEndEvent = generateDate();
  }

  return {
    id: nanoid(),
    pointType: generatePointTypes(),
    destinationCity: generateDestinationCity(),
    offers: generateOffers(),
    destinationInfo: {
      description: generateDescription(),
      photos: generatePhotos(),
    },
    dateTimeStartEvent,
    dateTimeEndEvent,
    cost: getRandomInteger(OfferCost.FROM, OfferCost.TO),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
