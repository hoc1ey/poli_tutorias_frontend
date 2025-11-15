import { parseDate } from './parseDate';

/**
 * Compara dos fechas ignorando la hora
 * @param date1 - Primera fecha a comparar
 * @param date2 - Segunda fecha a comparar
 * @returns true si las fechas son iguales (mismo día, mes y año)
 */
export const areDatesEqual = (
  date1: Date | string | undefined,
  date2: Date | string | undefined
): boolean => {
  const parsedDate1 = parseDate(date1);
  const parsedDate2 = parseDate(date2);

  if (!parsedDate1 || !parsedDate2) return false;

  return parsedDate1.getTime() === parsedDate2.getTime();
};
