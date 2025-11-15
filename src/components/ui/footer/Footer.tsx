import React from 'react'
import { inter } from '../../../config/fonts'

export const Footer = () => {
  return (
    <footer className="bg-(--dark-blue) text-white px-8 w-full h-[60px] flex items-center justify-center">
      <p className={`${inter.className} text-center text-[20px]`}>© 2025 PoliTutorías | Todos los derechos reservados</p>
    </footer>
  )
}
