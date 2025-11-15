export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {

  // Si el numero total de páginas es 7 o menos,
  // vamos a mostrar el número total de páginas
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Si la página actual está entre las primeras 3 páginas
  // mostrar las primeras 3, puntos supensivos, y las ultimas 2
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages];
  }

  // Si la página actual está entre las últimas
  // mostrar las primeras 2, puntos suspensivos, y las últimas 3
  if (currentPage >= totalPages - 2) {
    return [1, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // Si la página actual está en medio
  // mostrar la primera página, puntos supensivos, la página actual y vecinos.
  return [
    1,
    '...',
    currentPage,
    '...',
    totalPages
  ]

}