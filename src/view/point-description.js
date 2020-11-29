export const createPointDescriptionTemplate = (offer) => {
  const {destinationCity, destinationInfo} = offer;

  return `
  <p class="event__destination-description">${destinationCity} ${destinationInfo[0].description}</p>
  `;
};
