/**
 * Formatea una hora en formato de slot (hora:00 - hora+1:00)
 * @param hour - Hora en formato string (puede ser "11" o "11:00")
 * @returns String formateado como "11:00 - 12:00"
 */
export const formatHourSlot = (hour: string): string => {
  const hourNumber = Number(hour.split(':')[0]);
  return `${hour.includes(':') ? hour : `${hour}:00`} - ${hourNumber + 1}:00`;
};
