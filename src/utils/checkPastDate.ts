import { parseDate } from './parseDate';

/**
 * Verifica si una fecha ya pasó
 * @param dateInput - Fecha a verificar
 * @param cutoffHour - Hora límite del día actual (por defecto 20, después de esta hora se considera el día como pasado)
 * @returns true si la fecha ya pasó
 */
export const isPastDate = (
  dateInput: Date | string | undefined,
  cutoffHour: number = 20
): boolean => {
  const parsedDate = parseDate(dateInput);
  if (!parsedDate) return true;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Si es un día anterior a hoy
  if (parsedDate.getTime() < today.getTime()) {
    return true;
  }

  // Si es hoy, verificar la hora de corte
  if (parsedDate.getTime() === today.getTime()) {
    const currentHour = now.getHours();
    if (currentHour >= cutoffHour) {
      return true;
    }
  }

  return false;
};

/**
 * Verifica si un slot de hora específico ya pasó
 * @param slotHour - Hora del slot a verificar
 * @param dayDate - Fecha del día que contiene el slot
 * @returns true si el slot ya pasó
 */
export const isPastTimeSlot = (
  slotHour: number,
  dayDate: Date | string | undefined
): boolean => {
  const parsedDate = parseDate(dayDate);
  if (!parsedDate) return true;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Si es un día futuro, el slot no está en el pasado
  if (parsedDate.getTime() > today.getTime()) {
    return false;
  }

  // Si es hoy, verificar si la hora ya pasó
  if (parsedDate.getTime() === today.getTime()) {
    const year = parsedDate.getFullYear();
    const month = parsedDate.getMonth();
    const day = parsedDate.getDate();
    const slotDateTime = new Date(year, month, day, slotHour, 0, 0, 0);
    return slotDateTime.getTime() < now.getTime();
  }

  // Si es un día pasado, el slot está en el pasado
  return true;
};
