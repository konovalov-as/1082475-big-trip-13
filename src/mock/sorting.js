export const generateSorting = () => {
  const sorting = [{
    name: `day`,
    isChecked: true,
    isDisabled: false,
  },
  {
    name: `event`,
    isChecked: false,
    isDisabled: true,
  },
  {
    name: `time`,
    isChecked: false,
    isDisabled: false,
  },
  {
    name: `price`,
    isChecked: false,
    isDisabled: false,
  },
  {
    name: `offers`,
    isChecked: false,
    isDisabled: true,
  }];

  return sorting;
};
