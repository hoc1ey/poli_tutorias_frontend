const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export const formatRequestDateTruncate = (date: Date, slots: string[], abbreviate: boolean = false) => {

  let dayName = daysOfWeek[date.getDay() + 1];
  if (abbreviate) {
    dayName = dayName.substring(0, 3);
  }

  const dayNumber = date.getDate();

  let monthName = months[date.getMonth()];
  if (abbreviate) {
    monthName = monthName.substring(0, 3);
  }

  const formattedSlots = slots.map(slot => {
    const hour = parseInt(slot, 10);
    const startHour = String(hour).padStart(2, '0');
    const endHour = String(hour).padStart(2, '0');
    return `${startHour}:00 - ${endHour}:00`;
  });

  return `${dayName} ${dayNumber} de ${monthName}, ${formattedSlots.join(', ')}`;

}