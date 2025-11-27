'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { UseFormRegister, FieldErrors, RegisterOptions } from 'react-hook-form';
import { PiEye, PiEyeClosed } from 'react-icons/pi';
import './FormPasswordInput.css';

interface FormPasswordInputProps {
  id: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  validation?: RegisterOptions;
  errors: FieldErrors;
  required?: boolean;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  autoComplete?: string;
  placeholder?: string;
}

export const FormPasswordInput = ({
  id,
  label,
  register,
  validation,
  errors,
  required = false,
  className = '',
  containerClassName = '',
  labelClassName = '',
  errorClassName = '',
  autoComplete = 'current-password',
  placeholder,
}: FormPasswordInputProps) => {
  const [passwordVisibility, setPasswordVisibility] = useState<'password' | 'text'>('password');
  const error = errors[id];

  const handlePasswordVisibility = () => {
    setPasswordVisibility(prev => prev === 'password' ? 'text' : 'password');
  };

  return (
    <div className={clsx('form-field-container', className)}>
      <label htmlFor={id} className={clsx('label', labelClassName)}>
        {label}{required && '*'}
      </label>

      <div
        className={clsx(
          'form-password-input-wrapper',
          {
            'border-(--grey)': !error,
            'border-red-500': error,
          },
          containerClassName
        )}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            const input = e.currentTarget.querySelector('input');
            input?.focus();
          }
        }}
      >
        <input
          id={id}
          type={passwordVisibility}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className="form-password-input"
          {...register(id, validation)}
        />
        {passwordVisibility === 'password' ? (
          <PiEye
            size={24}
            className="cursor-pointer text-(--grey)"
            onClick={handlePasswordVisibility}
          />
        ) : (
          <PiEyeClosed
            size={24}
            className="cursor-pointer text-(--grey)"
            onClick={handlePasswordVisibility}
          />
        )}
      </div>

      {error && (
        <p className={clsx('form-error-message', errorClassName)}>
          {error.message?.toString()}
        </p>
      )}
    </div>
  );
};
