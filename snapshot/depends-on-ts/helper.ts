/* tslint:disable */
/* eslint-disable */

export const getColor = (color: string | string[] | undefined, index: number, defaultColor: string) => {
  return color
    ? (
      typeof color === 'string'
        ? color
        : color[index] || defaultColor
    )
    : defaultColor;
};
