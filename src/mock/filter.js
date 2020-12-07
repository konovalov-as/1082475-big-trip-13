const FilterName = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

export const generateFilter = () => {
  return [{
    name: FilterName.EVERYTHING,
    isChecked: true,
  },
  {
    name: FilterName.FUTURE,
    isChecked: false,
  },
  {
    name: FilterName.PAST,
    isChecked: false,
  }];
};
