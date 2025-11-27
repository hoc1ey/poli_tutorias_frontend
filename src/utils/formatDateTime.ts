const months = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
];

/**
 * Formatea un objeto Date al formato: "DD de Mmm, AAAA - HH:MM"
 * @param dateObject El objeto Date a formatear.
 * @returns La cadena de fecha formateada.
 */
export const formatDateTime = (dateObject: Date): string => {

  if (!(dateObject instanceof Date) || isNaN(dateObject.getTime())) {
    return "Fecha Inválida";
  }

  const day = dateObject.getDate();
  const monthIndex = dateObject.getMonth();
  const year = dateObject.getFullYear();

  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();

  const formattedDate = `${day} de ${months[monthIndex]}, ${year}`;

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');

  const formattedTime = `${formattedHours}:${formattedMinutes}`;

  return `${formattedDate} - ${formattedTime}`;
};