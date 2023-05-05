export const range = (safelist: string[], prefix: string) => {
  return safelist.map((i) => `${prefix}-${i}`);
};
