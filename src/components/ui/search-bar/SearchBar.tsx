'use client';

import { inter } from "@/config/fonts";
import { IoSearchSharp } from "react-icons/io5";
import React, { useState, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  placeholder: string;
}

export const SearchBar = ({ placeholder }: Props) => {

  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const validateQuery = (query: string): string | true => {
    if (!query || query.length === 0) {
      return true;
    }
    const specialCharsRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    if (!specialCharsRegex.test(query)) {
      return 'No se permiten caracteres especiales.';
    }
    return true;
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const query = inputRef.current?.value || '';

    const validationResult = validateQuery(query);

    if (validationResult !== true) {
      setError(validationResult);
      return;
    }

    setError(null);
    const params = new URLSearchParams(searchParams.toString());

    if (query.trim() === '') {
      params.delete('query');
    } else {
      params.set('query', query.trim());
    }

    const newUrl = `${pathname}?${params.toString()}`;
    router.replace(newUrl);
  }

  return (
    <div className="flex flex-col w-full items-center justify-center align-middle">
      <div
        className={`w-full md:w-[763px] h-[38px] rounded-[25px] px-[12px]
        border
        flex items-center
        ${isFocused ? 'border-(--dark-blue)' : 'border-(--grey-border)'}`}>
        <IoSearchSharp size={18} className="text-(--dark-blue)" />
        <input
          type="text"
          placeholder={placeholder}
          ref={inputRef}
          onChange={onSubmit}
          className={`font-inter font-normal text-[16px] text-(--dark-blue) w-full px-[11px] outline-none placeholder:text-black/40`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
          }}
          onInput={() => { if (error) setError(null); }}
        />
      </div>

      {
        error && (
          <p className='text-red-700 text-sm mt-1'>{error}</p>
        )
      }
    </div>
  )
}