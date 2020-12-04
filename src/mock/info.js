import dayjs from 'dayjs';
import {getRandomInteger} from "../utils";
import {OfferCost} from '../const';
import {DESTINATION_CITIES} from '../const';

const generateDate = () => {
  const maxDaysGap = getRandomInteger(OfferCost.FROM, OfferCost.TO);
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const maxHoursGap = getRandomInteger(OfferCost.FROM, OfferCost.TO);
  const hoursGap = getRandomInteger(-maxHoursGap, maxHoursGap);
  const maxMinutesGap = getRandomInteger(OfferCost.FROM, OfferCost.TO);
  const minutesGap = getRandomInteger(-maxMinutesGap, maxMinutesGap);
  return dayjs().add(daysGap, `day`).add(hoursGap, `hours`).add(minutesGap, `minutes`);
};

const generateDestinationCity = () => {
  const randomIndex = getRandomInteger(0, DESTINATION_CITIES.length - 1);

  return DESTINATION_CITIES[randomIndex];
};

const generateDestinationCities = () => {
  const citiesCount = getRandomInteger(1, 5);
  let cities = [];

  for (let index = 0; index < citiesCount; index++) {
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
    cost: getRandomInteger(OfferCost.FROM, OfferCost.TO),
  };
};
