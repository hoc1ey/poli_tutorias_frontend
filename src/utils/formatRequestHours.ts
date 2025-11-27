export const formatRequestHours = (horas: string[]): string => {
  const intervalos = horas.map(hora => {
    const horaInicio = parseInt(hora);
    const horaFin = horaInicio + 1;
    return `${horaInicio}:00 a ${horaFin}:00`;
  });

  return intervalos.join(', ');
}
