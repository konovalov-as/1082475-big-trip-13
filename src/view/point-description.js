import AbstractView from './abstract';

const createPointDescriptionTemplate = (offer) => {
  const {destinationCity, destinationInfo} = offer;

  return `<p class="event__destination-description">${destinationCity} ${destinationInfo[0].description}</p>`;
};

export default class PointDescription extends AbstractView {
  constructor(offer) {
    super();
    this._offer = offer;
  }

  getTemplate() {
    return createPointDescriptionTemplate(this._offer);
  }
}
