/**
 * Formatea una fecha y hora específica en un string legible
 * @param date - Fecha del slot
 * @param hour - Hora de inicio del slot (en formato número)
 * @returns String formateado como "Jueves 13 Nov, 11:00 - 12:00"
 */
export const formatTimeSlot = (date: Date, hour: number): string => {
  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

  const dayName = daysOfWeek[date.getDay()];
  const dayNumber = date.getDate();
  const monthName = months[date.getMonth()];

  const startHour = hour.toString().padStart(2, '0');
  const endHour = (hour + 1).toString().padStart(2, '0');

  return `${dayName} ${dayNumber} ${monthName}, ${startHour}:00 - ${endHour}:00`;
};
