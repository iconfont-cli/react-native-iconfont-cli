/* tslint:disable */
/* eslint-disable */

export const getIconColor = (color: string | string[] | undefined, index: number, defaultColor: string) => {
  return color
    ? (
      typeof color === 'string'
        ? color
        : color[index] || defaultColor
    )
    : defaultColor;
};
