import {FilterType} from '../const';

export const generateFilter = () => {
  return [{
    name: FilterType.EVERYTHING,
    isChecked: true,
  },
  {
    name: FilterType.FUTURE,
    isChecked: false,
  },
  {
    name: FilterType.PAST,
    isChecked: false,
  }];
};
