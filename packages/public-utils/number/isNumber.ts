export const isNumber = (val: string | number) => typeof val === "number" || /^\d+(\.\d+)?$/.test(val);
