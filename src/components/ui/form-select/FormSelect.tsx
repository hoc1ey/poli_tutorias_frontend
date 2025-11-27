import clsx from 'clsx';
import { UseFormRegister, FieldErrors, RegisterOptions } from 'react-hook-form';
import './FormSelect.css';

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  id: string;
  label: string;
  options: Option[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  validation?: RegisterOptions;
  errors: FieldErrors;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  selectClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  defaultValue?: string;
  placeholder?: string;
}

export const FormSelect = ({
  id,
  label,
  options,
  register,
  validation,
  errors,
  required = false,
  disabled = false,
  className = '',
  selectClassName = '',
  labelClassName = '',
  errorClassName = '',
  defaultValue,
  placeholder,
}: FormSelectProps) => {
  const error = errors[id];

  return (
    <div className={clsx('form-field-container', className)}>
      <label htmlFor={id} className={clsx('label', labelClassName)}>
        {label}{required && '*'}
      </label>
      <select
        id={id}
        disabled={disabled}
        defaultValue={defaultValue}
        className={clsx(
          'form-select',
          {
            'border-(--grey)': !error,
            'border-red-700': error,
            'cursor-not-allowed': disabled,
          },
          selectClassName
        )}
        {...register(id, validation)}
      >
        {placeholder && (
          <option key={`placeholder-${id}`} className='text-(--dark-blue)' value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt, i) => (
          <option key={`${id}-${opt.value}-${i}`} className='text-(--dark-blue)' value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className={clsx('text-red-700 text-xs mt-1', errorClassName)}>
          {error.message?.toString()}
        </p>
      )}
    </div>
  );
};
