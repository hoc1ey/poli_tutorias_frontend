export const formatDate = (date: Date): string => {

  const opciones: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };

  const fechaFormateada = new Intl.DateTimeFormat('es-ES', opciones).format(date);

  return fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);
}