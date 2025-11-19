const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const months = ['Eneero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export const formatRequestDate = (date: Date, slots: string[]) => {

  const dayName = daysOfWeek[date.getDay()];
  const dayNumber = date.getDate();
  const monthName = months[date.getMonth()];

  const formattedSlots = slots.map(slot => {
    const hour = parseInt(slot, 10);
    return `${hour}:00 - ${hour + 1}:00`;
  });

  return `${dayName} ${dayNumber} de ${monthName}, de ${formattedSlots.join(', ')}`;

}