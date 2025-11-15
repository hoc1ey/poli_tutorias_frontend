'use client';

import '../AuthForms.css'
import { Faculty } from '@/interfaces';
import { FormInput, FormSelect, FormTextarea, FormPasswordInput } from '@/components';
import { useAppModal, useNewAccountForm } from '@/hooks';
import { useRouter } from 'next/navigation';

interface Props {
  faculties: Faculty[]
}

export const NewAccountForm = ({ faculties }: Props) => {

  const {
    handleSubmit,
    onSubmit,
    register,
    errors,
    isSubmitting,
    handleFacultyChange,
    availableCareers
  } = useNewAccountForm(faculties);

  const { openWarning } = useAppModal();

  const router = useRouter();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center justify-center align-middle pb-[89px]'>

      <div className='flex border border-dashed border-(--grey) w-[191px] h-[191px] rounded-full items-center text-center text-(--grey-blue)'>
        Seleccionar imagen de perfil
      </div>

      <div className='flex flex-col gap-[8px] w-full mt-[26px]'>

        <div className='flex-row-input-container'>
          <FormInput
            id="name"
            label="Nombre"
            register={register}
            errors={errors}
            required
            className="container-default"
            inputClassName="input-default input-default-text"
            validation={{
              required: 'Campo obligatorio',
              validate: (value) => {
                const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
                return nameRegex.test(value) || 'Solo debe contener letras';
              }
            }}
          />

          <FormInput
            id="lastName"
            label="Apellido"
            register={register}
            errors={errors}
            required
            className="container-default"
            inputClassName="input-default input-default-text"
            validation={{
              required: 'Campo obligatorio'
            }}
          />
        </div>

        <div className='flex-row-input-container'>
          <FormInput
            id="dni"
            label="Cédula"
            register={register}
            errors={errors}
            required
            className="container-default"
            inputClassName="input-default input-default-text"
            validation={{
              required: 'Campo obligatorio',
              validate: (value) => {
                return value.length === 10 || 'Cédula inválida'
              }
            }}
          />

          <FormInput
            id="uniqueCode"
            label="Código Único"
            register={register}
            errors={errors}
            required
            className="container-default"
            inputClassName="input-default input-default-text"
            validation={{
              required: 'Campo obligatorio',
              validate: (value) => {
                return value.length === 9 || 'Código inválido'
              }
            }}
          />
        </div>

        <div className='flex-row-input-container'>
          <FormInput
            id="primaryPhone"
            label="Contacto Principal"
            type="tel"
            register={register}
            errors={errors}
            required
            className="container-default"
            inputClassName="input-default input-default-text"
            validation={{
              required: 'Campo obligatorio',
              validate: (value) => {
                if (value.length !== 10 || !value.startsWith('09')) return 'Celular inválido';
                return true;
              }
            }}
          />

          <FormInput
            id="optionalPhone"
            label="Contacto Opcional"
            type="tel"
            register={register}
            errors={errors}
            className="container-default"
            inputClassName="input-default input-default-text"
            validation={{
              validate: (value) => {
                if (!value) return true;
                if (value.length !== 10 || !value.startsWith('09')) return 'Celular inválido';
                return true;
              }
            }}
          />
        </div>

        <div className='flex-row-input-container'>
          <div className="container-default">
            <label htmlFor="faculty" className="label">
              Facultad*
            </label>
            <select
              id="faculty"
              {...register('faculty', {
                required: 'Campo obligatorio',
                onChange: handleFacultyChange
              })}
              className={`select-default input-default-text form-select ${errors.faculty ? 'border-red-700' : 'border-(--grey)'}`}
            >
              {faculties.map(faculty => (
                <option key={faculty.facultyId} value={faculty.facultyId}>
                  {faculty.faculty}
                </option>
              ))}
            </select>
            {errors.faculty && (
              <p className="text-red-700 text-xs mt-1">
                {errors.faculty.message?.toString()}
              </p>
            )}
          </div>

          <FormSelect
            id="career"
            label="Carrera"
            options={availableCareers.map(career => ({ value: career.careerId, label: career.careerName }))}
            register={register}
            errors={errors}
            required
            disabled={availableCareers.length === 0}
            className="container-default"
            selectClassName="select-default input-default-text"
            placeholder="Selecciona una carrera"
            validation={{
              required: 'Campo obligatorio'
            }}
          />
        </div>

        <div className='flex-row-input-container'>
          <FormInput
            id="email"
            label="Correo electrónico"
            type="email"
            register={register}
            errors={errors}
            required
            className="container-full-width"
            inputClassName="input-full-width input-default-text"
            validation={{
              required: 'Campo obligatorio',
              validate: (value) => {
                const domain = value.split('@')[1];
                if (domain !== ('epn.edu.ec')) return 'Ingrese un correo institucional'
                return true;
              }
            }}
          />
        </div>

        <div className='flex-row-input-container'>
          <FormPasswordInput
            id="password"
            label="Contraseña"
            register={register}
            errors={errors}
            required
            autoComplete="new-password"
            className="container-default"
            containerClassName="password-wrapper-default"
            validation={{
              required: 'Campo obligatorio',
              minLength: {
                value: 8,
                message: 'Mínimo 8 caracteres'
              },
              validate: (value) => {
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.])[A-Za-z\d@$!%*?&]/;
                if (!passwordRegex.test(value)) {
                  return 'Debe contener al menos una mayúscula, una minúscula, un número y un carácter especial';
                }
                return true;
              }
            }}
          />

          <FormSelect
            id="role"
            label="Tipo de Usuario"
            options={[
              { value: 'tutor', label: 'Tutor' },
              { value: 'student', label: 'Estudiante' }
            ]}
            register={register}
            errors={errors}
            required
            className="container-default"
            selectClassName="select-default input-default-text"
            validation={{
              required: true
            }}
          />
        </div>

        <div className='flex-row-input-container'>
          <FormTextarea
            id="bio"
            label="Bio"
            register={register}
            errors={errors}
            required
            className="container-full-width"
            textareaClassName="textarea-full-width input-default-text"
            validation={{
              required: 'Campo obligatorio',
              minLength: {
                value: 10,
                message: 'Debe tener al menos 10 caracteres'
              }
            }}
          />
        </div>

        <div className='flex gap-[67px] items-center justify-center mt-[56px]'>

          <button
            className='btn-dark-blue font-lato font-bold text-center px-[40px] py-[10px]'
            type='button'
            disabled={isSubmitting}
            onClick={() => {
              openWarning({
                message: '¿Estás seguro/a de cancelar el registro de la cuenta?',
                confirmBtnText: 'Si',
                cancelBtnText: 'No',
                onConfirm: (() => {
                  router.replace('/auth/login');
                })
              })
            }}
          >
            Cancelar
          </button>

          <button
            type='submit'
            disabled={isSubmitting}
            className="btn-dark-yellow button"
          >
            {isSubmitting ? (
              <div className="h-5 w-5 border-2 border-(--dark-blue) spin-animation"></div>
            ) : (
              'Registrar'
            )}
          </button>

        </div>

      </div>
    </form>
  )
}
