import React from 'react';
import clsx from 'clsx';
import { UseFormRegister, FieldErrors, RegisterOptions } from 'react-hook-form';
import './FormInput.css';

interface FormInputProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'number';
  register: UseFormRegister<any>;
  validation?: RegisterOptions;
  errors: FieldErrors;
  required?: boolean;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  autoComplete?: string;
  placeholder?: string;
  maxLength?: number;
  showCounter?: boolean;
}

export const FormInput = ({
  id,
  label,
  type = 'text',
  register,
  validation,
  errors,
  required = false,
  className = '',
  inputClassName = '',
  labelClassName = '',
  errorClassName = '',
  autoComplete,
  placeholder,
  maxLength,
  showCounter = false,
}: FormInputProps) => {
  const error = errors[id];
  const reg = register(id, validation);
  const [count, setCount] = React.useState<number>(0);

  React.useEffect(() => {
    try {
      const el = document.getElementById(id) as HTMLInputElement | null;
      if (el) setCount(el.value.length);
    } catch (e) {
      // ignore
    }
  }, [id]);

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    let val = target.value ?? '';
    if (maxLength && val.length > maxLength) {
      val = val.slice(0, maxLength);
      target.value = val;
    }
    setCount(val.length);
    if ((reg as any)?.onChange) {
      (reg as any).onChange(e as any);
    }
  };

  return (
    <div className={clsx('form-field-container', className)}>
      <label htmlFor={id} className={clsx('label', labelClassName)}>
        {label}{required && '*'}
      </label>
      <>
        <input
          id={id}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={clsx(
            'form-input',
            {
              'border-(--grey)': !error,
              'border-red-700': error,
            },
            inputClassName
          )}
          {...reg}
          onInput={type === 'number' ? undefined : handleInput}
        />
        {showCounter && maxLength !== undefined && (
          <p className='text-end text-sm text-(--grey)'>
            {count}/{maxLength}
          </p>
        )}
      </>
      {error && (
        <p className={clsx('text-red-700 text-xs mt-1', errorClassName)}>
          {error.message?.toString()}
        </p>
      )}
    </div>
  );
};
