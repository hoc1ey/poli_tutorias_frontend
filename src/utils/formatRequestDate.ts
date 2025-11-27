const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export const formatRequestDate = (dateString: string, slots: string[], abbreviate: boolean = false) => {

  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  let dayName = daysOfWeek[date.getDay()];
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
    const endHour = String(hour + 1).padStart(2, '0');
    return `${startHour}:00 - ${endHour}:00`;
  });

  return `${dayName} ${dayNumber} de ${monthName}, ${formattedSlots.join(', ')}`;

}