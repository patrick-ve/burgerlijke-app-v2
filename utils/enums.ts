export const formatEnumValue = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

export const toEnumValue = (value: string): string => {
  return value.toUpperCase();
};
