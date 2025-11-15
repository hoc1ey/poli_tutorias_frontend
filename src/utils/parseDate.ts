/**
 * Parsea una fecha que puede venir como string o Date y retorna un objeto Date
 * @param dateInput - Fecha en formato string "YYYY-MM-DD" o Date
 * @returns Objeto Date parseado
 */
export const parseDate = (dateInput: Date | string | undefined): Date | null => {
  if (!dateInput) return null;

  let year: number, month: number, day: number;

  if (typeof dateInput === 'string') {
    const parts = dateInput.split('-');
    year = parseInt(parts[0]);
    month = parseInt(parts[1]) - 1; // Los meses en JS son 0-indexed
    day = parseInt(parts[2]);
  } else {
    year = dateInput.getFullYear();
    month = dateInput.getMonth();
    day = dateInput.getDate();
  }

  return new Date(year, month, day);
};
