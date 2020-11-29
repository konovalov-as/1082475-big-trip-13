import dayjs from 'dayjs';

const DESTINATION_CITY_ONE = 1;
const DESTINATION_CITY_TWO = 2;

export const createInfoTemplate = (info) => {
  const {destinationCities, dateTimeStartEvent, dateTimeEndEvent, cost} = info;

  const dateStart = dateTimeStartEvent !== null
    ? dayjs(dateTimeStartEvent).format(`MMM DD`)
    : ``;

  const dateEnd = dateTimeEndEvent !== null
    ? dayjs(dateTimeEndEvent).format(`MMM DD`)
    : ``;

  let listCities = ``;
  if (destinationCities.length === DESTINATION_CITY_ONE) {
    listCities = destinationCities[0];
  }
  if (destinationCities.length === DESTINATION_CITY_TWO) {
    listCities = destinationCities[0] + ` - ` + destinationCities[1];
  }
  if (destinationCities.length > DESTINATION_CITY_TWO) {
    listCities = destinationCities[0] + ` - ... - ` + destinationCities[destinationCities.length - 1];
  }

  return `
  <section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${listCities}</h1>

      <p class="trip-info__dates">${dateStart} - ${dateEnd}</p>
    </div>
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
    </p>
  </section>
  `;
};
