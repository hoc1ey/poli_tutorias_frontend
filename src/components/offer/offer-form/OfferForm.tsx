'use client';

import { ibmPlexSans } from '@/config/fonts'
import { ImageUploader, FormInput, FormTextarea } from '@/components';
import { AvailableCareers, OfferFormInputs, Subject } from '@/interfaces';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import './OfferForm.css'

interface Props {
  availableCareersAndSubjects: AvailableCareers;
  setUploadedFile: (file: File | null) => void;
  register: UseFormRegister<OfferFormInputs>;
  errors: FieldErrors<OfferFormInputs>;
  setValue: UseFormSetValue<OfferFormInputs>
}

export const OfferForm = ({
  availableCareersAndSubjects,
  setUploadedFile,
  register,
  errors,
  setValue
}: Props) => {

  const [selectedCareer, setSelectedCareer] = useState<string>('default');
  const [selectedMode, setSelectedMode] = useState<string>('default');
  const [selectedSubject, setSelectedSubject] = useState<string>('default');
  const [availableSubjects, setAvailableSubjects] = useState<Subject[] | undefined>(undefined);

  useEffect(() => {
    if (selectedCareer !== 'default') {
      const career = availableCareersAndSubjects?.careers?.find(
        (c) => c.careerId === selectedCareer
      );
      setAvailableSubjects(career?.subjects || undefined);
      setValue('subject', 'default')
      setSelectedSubject('default');
    } else {
      setAvailableSubjects(undefined);
      setValue('subject', 'default')
      setSelectedSubject('default');
    }
  }, [selectedCareer, availableCareersAndSubjects]);

  const handleCareerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCareer(e.target.value);
  };

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMode(e.target.value);
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(e.target.value);
  };

  const careerOptions = [
    { value: 'default', label: 'Selecciona una Carrera' },
    ...(availableCareersAndSubjects?.careers?.map(career => ({
      value: career.careerId,
      label: career.careerName
    })) || [])
  ];

  const subjectOptions = [
    { value: 'default', label: 'Selecciona una Materia' },
    ...(availableSubjects?.map(subject => ({
      value: subject.code,
      label: subject.name
    })) || [])
  ];

  return (
    <div className='offer-form-two-column mt-[43px]'>

      <div className='offer-form-column-left'>

        {/* Carrera Select */}
        <div className="offer-form-field">
          <label className='offer-form-label'>Carrera *</label>
          <select
            id="career"
            defaultValue="default"
            className={clsx(
              'offer-select-full',
              {
                'border-(--grey)': !errors.career,
                'border-red-700': errors.career,
              },
              selectedCareer === 'default' ? 'offer-input-text-color' : 'text-(--dark-blue)'
            )}
            {...register('career', {
              required: 'Campo obligatorio.',
              validate: (value) => value !== 'default' || 'Campo obligatorio.',
              onChange: handleCareerChange
            })}
          >
            <option className='text-(--dark-blue)' value="default" disabled>Selecciona una Carrera</option>
            {careerOptions.slice(1).map((opt) => (
              <option key={opt.value} className='text-(--dark-blue)' value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.career && (
            <p className='text-red-700 text-xs mt-1'>{errors.career.message}</p>
          )}
        </div>

        {/* Modalidad Select */}
        <div className="offer-form-field">
          <label className='offer-form-label'>Modalidad *</label>
          <select
            id="mode"
            defaultValue="default"
            className={clsx(
              'offer-select-full',
              {
                'border-(--grey)': !errors.mode,
                'border-red-700': errors.mode,
              },
              selectedMode === 'default' ? 'offer-input-text-color' : 'text-(--dark-blue)'
            )}
            {...register('mode', {
              required: 'Campo obligatorio.',
              validate: (value) => value !== 'default' || 'Campo obligatorio.',
              onChange: handleModeChange
            })}
          >
            <option className='text-(--dark-blue)' value="default" disabled>Selecciona una Modalidad</option>
            <option className='text-(--dark-blue)' value="in-person">Presencial</option>
            <option className='text-(--dark-blue)' value="online">Virtual</option>
          </select>
          {errors.mode && (
            <p className='text-red-700 text-xs mt-1'>{errors.mode.message}</p>
          )}
        </div>

        {/* Precio Input */}
        <div className="offer-form-field">
          <label className='offer-form-label'>Precio *</label>
          <div className='price-input-wrapper'>
            <input
              id="price"
              type="number"
              className={clsx(
                'offer-input-full text-(--dark-blue)',
                {
                  'border-(--grey)': !errors.price,
                  'border-red-700': errors.price,
                }
              )}
              {...register('price', {
                required: 'Campo obligatorio.',
                min: {
                  value: 1,
                  message: 'Precio entre $1 y $15'
                },
                max: {
                  value: 15,
                  message: 'Precio entre $1 y $15'
                },
                validate: (price) => {
                  return !price.toString().includes('.') || 'Debe ser un número entero.'
                }
              })}
            />
            <p className={`${ibmPlexSans.className} price-unit-label`}>$/h</p>
          </div>
          {errors.price && (
            <p className='text-red-700 text-xs mt-1'>{errors.price.message}</p>
          )}
        </div>

        {/* Image Uploader */}
        <div className='offer-form-field'>
          <label className='offer-form-label'>Foto de la publicación</label>
          <ImageUploader onFileChange={setUploadedFile} register={register} errors={errors} />
          {errors.image && (
            <p className='text-red-700 text-xs mt-1'>{errors.image.message}</p>
          )}
        </div>

      </div>

      <div className='offer-form-column-right'>

        {/* Materia Select */}
        <div className="offer-form-field">
          <label className='offer-form-label'>Materia *</label>
          <select
            id="subject"
            value={selectedSubject}
            disabled={!availableSubjects}
            className={clsx(
              'offer-select-full',
              {
                'border-(--grey)': !errors.subject,
                'border-red-700': errors.subject,
                'cursor-not-allowed': !availableSubjects,
              },
              selectedSubject === 'default' ? 'offer-input-text-color' : 'text-(--dark-blue)'
            )}
            {...register('subject', {
              required: 'Campo obligatorio.',
              validate: (value) => value !== 'default' || 'Campo obligatorio.',
              onChange: handleSubjectChange
            })}
          >
            <option className='text-(--dark-blue)' value="default" disabled>Selecciona una Materia</option>
            {subjectOptions.slice(1).map((opt) => (
              <option key={opt.value} className='text-(--dark-blue)' value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.subject && (
            <p className='text-red-700 text-xs mt-1'>{errors.subject.message}</p>
          )}
        </div>

        {/* Indicaciones Input */}
        <FormInput
          id="indications"
          label="Indicaciones para la reunión *"
          type="text"
          register={register}
          errors={errors}
          className="offer-form-field"
          inputClassName="offer-input-full text-[var(--dark-blue)] mt-[8px]"
          validation={{
            required: 'Campo obligatorio.',
            minLength: {
              value: 20,
              message: "Las indicaciones deben contener un mínimo de 20 y un máximo de 100 caracteres."
            },
            maxLength: {
              value: 100,
              message: "Las indicaciones deben contener un mínimo de 20 y un máximo de 100 caracteres."
            }
          }}
          maxLength={100}
        />

        {/* Descripción Textarea */}
        <FormTextarea
          id="description"
          label="Descripción *"
          register={register}
          errors={errors}
          rows={4}
          className="offer-form-field"
          textareaClassName="offer-textarea-full text-[var(--dark-blue)] resize-none mt-[8px]"
          validation={{
            required: 'Campo obligatorio',
            minLength: {
              value: 50,
              message: "La descripción debe contener un mínimo de 50 y un máximo de 500 caracteres."
            },
            maxLength: {
              value: 500,
              message: "La descripción debe contener un mínimo de 50 y un máximo de 500 caracteres."
            }
          }}
          maxLength={500}
        />

      </div>
    </div>
  )
}
