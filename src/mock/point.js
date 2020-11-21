const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateTripPointType = () => {
  const tripPointType = [
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

  const randomIndex = getRandomInteger(0, tripPointType.length - 1);

  return tripPointType[randomIndex];
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

const additionalConditions = [{
  id: 1,
  value: `Add luggage`,
},
{
  id: 2,
  value: `Rent a car`,
},
{
  id: 3,
  value: `Add breakfast`,
},
{
  id: 4,
  value: `Book tickets`,
},
{
  id: 5,
  value: `Switch to comfort`,
},
{
  id: 6,
  value: `Order Uber`,
},
{
  id: 7,
  value: `Add meal`,
},
{
  id: 8,
  value: `Choose seats`,
},
{
  id: 9,
  value: `Lunch in city`,
},
{
  id: 10,
  value: `Travel by train`,
},
]

export const generatePoint = () => {
  return {
    tripPointType: generateTripPointType(),
    destinationCity: generateDestinationCity(),
    additionalConditions: additionalConditions[getRandomInteger(0, additionalConditions.length - 1)],
    destinationInfo: [{
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
      photos: [`http://picsum.photos/248/152?r=${Math.random()}`, `http://picsum.photos/248/152?r=${Math.random()}`, `http://picsum.photos/248/152?r=${Math.random()}`],
    }],
    dateTimeStartEvent: `18/03/19 12:25`,
    dateTimeEndEvent: `18/03/19 13:35`,
    cost: 160,
  };
};
