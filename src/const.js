export const OfferCost = {
  FROM: 1,
  TO: 500,
};

export const DateGap = {
  FROM: 1,
  TO: 7,
};

export const DESTINATION_CITIES = [
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

export const POINT_TYPES = [
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

export const SortType = {
  DEFAULT: `default`,
  DATE_NEWER: `date-newer`,
  DATE_OLDER: `date-older`,
  COST_MORE: `cost-more`,
  COST_LESS: `cost-less`,
  TIME_MORE: `time-more`,
  TIME_LESS: `time-less`,
};

export const UserAction = {
  UPDATE_TASK: `UPDATE_TASK`,
  ADD_TASK: `ADD_TASK`,
  DELETE_TASK: `DELETE_TASK`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};
