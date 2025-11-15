import React from 'react';
import clsx from 'clsx';
import { UseFormRegister, FieldErrors, RegisterOptions } from 'react-hook-form';
import './FormTextarea.css';

interface FormTextareaProps {
  id: string;
  label: string;
  register: UseFormRegister<any>;
  validation?: RegisterOptions;
  errors: FieldErrors;
  required?: boolean;
  className?: string;
  textareaClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
}

export const FormTextarea = ({
  id,
  label,
  register,
  validation,
  errors,
  required = false,
  className = '',
  textareaClassName = '',
  labelClassName = '',
  errorClassName = '',
  placeholder,
  rows = 4,
  maxLength,
}: FormTextareaProps) => {
  const error = errors[id];
  const reg = register(id, validation);
  const [count, setCount] = React.useState<number>(0);

  React.useEffect(() => {
    // initialize count if there's a default value in the field (uncontrolled)
    try {
      const el = document.getElementById(id) as HTMLTextAreaElement | null;
      if (el) setCount(el.value.length);
    } catch (e) {
      // ignore
    }
  }, [id]);

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
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
        <textarea
          id={id}
          rows={rows}
          placeholder={placeholder}
          className={clsx(
            'form-textarea',
            {
              'border-(--grey)': !error,
              'border-red-700': error,
            },
            textareaClassName
          )}
          {...reg}
          onInput={handleInput}
        />
        {maxLength !== undefined && (
          <p className='text-end text-sm text-(--grey)'>
            {count}/{maxLength}
          </p>
        )}
        {error && (
          <p className={clsx('text-red-700 text-xs mt-1', errorClassName)}>
            {error.message?.toString()}
          </p>
        )}
      </>
    </div>
  );
};
