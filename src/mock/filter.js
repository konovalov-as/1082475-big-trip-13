export const generateFilter = () => {
  return [{
    name: `everything`,
    isChecked: true,
  },
  {
    name: `future`,
    isChecked: false,
  },
  {
    name: `past`,
    isChecked: false,
  }];
};
