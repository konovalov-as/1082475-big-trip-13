import AbstractView from './abstract';

const createInfoTemplate = (info) => {
  const {destinationCities, eventDate, cost} = info;

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${destinationCities}</h1>

      <p class="trip-info__dates">${eventDate}</p>
    </div>
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
    </p>
  </section>`;
};

export default class Info extends AbstractView {
  constructor(info) {
    super();
    this._info = info;
  }

  getTemplate() {
    return createInfoTemplate(this._info);
  }
}
