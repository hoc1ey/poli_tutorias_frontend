'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { handleLogout } from '@/actions';
import { useAppModal } from '@/hooks';
import { useScheduleStore } from '@/store';
import { IoClose } from 'react-icons/io5';

interface Props {
  image: string;
  name: string;
  lastName: string;
  email: string;
  role: string;
}

export const ProfileImage = ({ image, name, lastName, email, role }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { openError } = useAppModal();
  const { clearSchedule } = useScheduleStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const onLogout = async () => {
    setIsLoggingOut(true);
    setIsOpen(false);

    const result = await handleLogout();

    if (result.success) {
      if (typeof window !== 'undefined') {
        sessionStorage.clear();
        clearSchedule();
        localStorage.clear();
      }

      window.location.href = '/auth/login';
    } else {
      setIsLoggingOut(false);
      openError(
        {
          title: 'Error al cerrar sesión',
          message: result.message || 'No se pudo cerrar la sesión correctamente',
          btnText: 'Reintentar',
          onConfirm: onLogout,
        }
      );
    }
  };

  const getRoleName = (role: string) => {
    switch (role) {
      case 'student':
        return 'Estudiante';
      case 'tutor':
        return 'Tutor';
      case 'admin':
        return 'Administrador';
      default:
        return role;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="focus:outline-none hover:opacity-80 transition-opacity cursor-pointer"
        disabled={isLoggingOut}
      >
        <Image
          src={image}
          alt='Foto de perfil'
          width={55}
          height={55}
          className='rounded-full h-14 w-14 object-cover'
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-[60px] z-50 bg-white rounded-[10px] shadow-[0px_4px_6px_rgba(0,0,0,0.1)] w-[280px] h-[290px] p-6">

          <div className="relative flex flex-col items-center gap-1">

            <p className={`font-inter font-light text-[14px] text-(--grey-blue) w-full text-center`}>
              {email}
            </p>

            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-2 -right-2 text-2xl cursor-pointer"
              disabled={isLoggingOut}
            >
              <IoClose size={15} className='text-black' />
            </button>

            <div className="w-[110px] h-[110px] rounded-full overflow-hidden mt-[5px]">
              <Image
                src={image}
                alt='Foto de perfil'
                width={110}
                height={110}
                className='w-full h-full object-cover'
              />
            </div>

            <h3 className={`font-inter font-normal text-[20px] text-(--dark-blue) text-center`}>
              {name} {" "} {lastName}
            </h3>

            <p className={`font-inter font-light text-[14px] text-(--dark-blue)`}>
              {getRoleName(role)}
            </p>

            <button
              onClick={onLogout}
              disabled={isLoggingOut}
              className={`mt-[5px] btn-dark-blue font-medium bg-(--dark-blue) text-white py-[6px] px-[20px] hover:bg-opacity-90 transition-all disabled:opacity-50 cursor-pointer`}
            >
              {isLoggingOut ? 'Cerrando sesión...' : 'Cerrar Sesión'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
