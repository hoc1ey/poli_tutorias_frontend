'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import { GoPencil, GoTrash } from 'react-icons/go';
import { inter, lato, ibmPlexSans } from '@/config/fonts';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { OfferFormInputs } from '../../../interfaces';

const allowedFileExtensions = ["png", "jpg"];

const convertBytesToMB = (bytes: number) => (bytes / 1048576).toFixed(1);

interface Props {
  onFileChange: (file: File | null) => void;
  register: UseFormRegister<OfferFormInputs>;
  errors: FieldErrors<OfferFormInputs>;
}

const validateFileExtension = (file: File | null | undefined) => {
  if (!file) return false;
  const ext = file.name.split('.').pop()?.toLowerCase();
  return (!ext || !allowedFileExtensions.includes(ext)) ? false : true;
}

export const ImageUploader = ({ onFileChange, register, errors }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragCounter = useRef(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (newFile?: File) => {

    if (!newFile) return;
    if (!validateFileExtension(newFile)) return;

    setFile(newFile);
    setPreview(URL.createObjectURL(newFile));
    onFileChange(newFile);

    if (fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(newFile);
      fileInputRef.current.files = dataTransfer.files;

      const event = new Event('change', { bubbles: true });
      fileInputRef.current.dispatchEvent(event);
    }
  };

  const resetFile = () => {
    setFile(null);
    setPreview(null);
    onFileChange(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';

      const event = new Event('change', { bubbles: true });
      fileInputRef.current.dispatchEvent(event);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragCounter.current = 0;
    setIsDragging(false);
    handleFile(Array.from(e.dataTransfer.files)[0]);
  };

  const dragHandlers = {
    onDragEnter: (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (++dragCounter.current > 0) setIsDragging(true);
    },
    onDragLeave: (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (--dragCounter.current <= 0) {
        dragCounter.current = 0;
        setIsDragging(false);
      }
    },
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => e.preventDefault(),
    onDrop: handleDrop,
  };

  return (
    <div
      className={clsx(
        'border  border-dashed rounded-sm h-[130px] flex flex-col py-[20px] px-[30px]',
        { 'bg-(--light-blue)': isDragging },
        { "border-(--grey)": !errors.image },
        { "border-red-700": errors.image }
      )}
      {...dragHandlers}
    >
      {!file ? (
        <>
          <div className="flex flex-col h-full justify-center w-full">
            <p className={`${inter.className} text-[12px] text-(--grey) text-center`}>
              Sube tu imagen de portada
            </p>
            <p className={`${inter.className} text-[12px] text-(--grey) text-center`}>
              (formatos jpg o png)
            </p>
          </div>
          <div className="w-full flex justify-center">
            <button
              type="button"
              className={`${lato.className} cursor-pointer btn-dark-yellow font-extrabold bg-(--dark-yellow) text-[14px] px-[20px] py-[10px] w-fit mb-[10px]`}
              onClick={() => document.getElementById('fileInput')?.click()}
            >
              Seleccionar archivo
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-between w-full">
          <div className="relative w-[180px] h-[90px] rounded-md overflow-hidden shrink-0">
            <Image src={preview!} alt="Portada de la tutoría" fill className="object-cover" />
          </div>

          <div className="flex flex-col flex-1 mx-[20px] overflow-hidden min-w-0">
            <span className={`${ibmPlexSans.className} text-[14px] text-(--dark-blue) truncate`}>
              {file.name}
            </span>
            <p className={`${ibmPlexSans.className} text-[10px] text-(--grey-blue)`}>
              {convertBytesToMB(file.size)} MB
            </p>
          </div>

          <div className="flex gap-7 shrink-0">
            <GoPencil
              color="(--dark-blue)"
              size={25}
              className="cursor-pointer"
              onClick={() => document.getElementById('fileInput')?.click()}
            />
            <GoTrash color="(--dark-blue)" size={25} className="cursor-pointer" onClick={resetFile} />
          </div>
        </div>
      )}

      <input
        id="fileInput"
        type="file"
        accept=".jpg,.png"
        className="hidden"
        {
        ...register('image',
          {
            required: 'La imagen es obligatoria.',
            onChange: (e) => {
              const selectedFile = e.target.files?.[0];
              if (selectedFile) {
                setFile(selectedFile);
                setPreview(URL.createObjectURL(selectedFile));
                onFileChange(selectedFile);
              }
            },
            validate: (value) => {
              if (!value || (value instanceof FileList && value.length === 0)) {
                return 'La imagen es obligatoria.';
              }
              let file: File | null = null;

              if (value instanceof FileList) {
                file = value[0];
              } else {
                file = value as File;
              }

              if (!file) {
                return 'La imagen es obligatoria.';
              }

              const isValid = validateFileExtension(file);
              if (!isValid) {
                return 'Formato de imagen no válido. Solo se permiten .jpg o .png.';
              }

              const fileSizeMB = parseFloat(convertBytesToMB(file.size));
              if (fileSizeMB > 2) {
                return 'La imagen no puede ser mayor a 2 MB.';
              }

              return true;
            }
          }
        )
        }
        ref={(e) => {
          const { ref } = register('image');
          ref(e);
          fileInputRef.current = e;
        }}
      />

    </div>
  );
};
