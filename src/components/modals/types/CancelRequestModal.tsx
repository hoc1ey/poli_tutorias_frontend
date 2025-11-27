'use client';

import { useState } from "react";
import { AllowedReasons, CancelRequestFormInputs } from "@/interfaces";
import { useForm } from "react-hook-form";
import { FormTextarea } from "../../ui/form-textarea/FormTextarea";
import clsx from "clsx";
import { cancelRequest } from "@/actions";
import { useAppModal } from "@/hooks";
import { useRouter } from "next/navigation";

const reasons: AllowedReasons[] = [
  "Imprevisto personal",
  "Conflicto de horarios con otra tutoría",
  "Otras opciones de tutorías",
  "Otro",
];

interface Props {
  requestId: string;
  action: 'cancel-student';
  requestStatus: 'pending' | 'scheduled' | 'conflict';
  onClose: () => void;
}

export const CancelRequestModal = ({
  requestId,
  action,
  requestStatus,
  onClose,
}: Props) => {

  const [selectedReason, setSelectedReason] = useState<AllowedReasons | null>()

  const router = useRouter();

  const { openCheck, openError } = useAppModal();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<CancelRequestFormInputs>();



  const isScheduled = requestStatus === 'scheduled';


  const handleReasonChange = (reason: AllowedReasons) => {
    setSelectedReason(reason);
    setValue('cancellationReason', reason);
  }

  const onSubmit = async (data: CancelRequestFormInputs) => {

    const cancellationInfo = {
      cancellationReason: data.cancellationReason,
      cancellationMessage: data.cancellationMessage,
    }

    const { success } = await cancelRequest(requestId, action, cancellationInfo)

    if (success) {

      openCheck({
        title: 'Solicitud cancelada',
        message: 'Se he notificado al tutor sobre la cancelación y el motivo',
        btnText: 'Cerrar',
      },
        () => {
          router.replace('/student/requests');
        }
      )
      return;
    }

    openError({
      title: 'Error',
      message: 'Error al cancelar la solicitud',
      btnText: 'Cerrar',
    })

  }

  return (
    <div className="relative w-[517px] h-fix rounded-2xl bg-white py-[29px] px-[31px] shadow-lg font-inter">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full flex flex-col"
      >
        <div className="flex flex-col gap-[15px] mb-[15px]">
          <h2 className="text-[30px] font-montserrat font-semibold text-(--dark-blue)">
            {isScheduled ? 'Cancelar Tutoría Confirmada' : 'Cancelar Solicitud'}
          </h2>

          <p className="text-[14px] text-(--grey-blue)">
            {
              isScheduled
                ? 'Estás a punto de cancelar una tutoría ya programada. Por favor, explica el motivo de la cancelación.'
                : '¿Estás seguro de que quieres cancelar tu solicitud? Si lo deseas, puedes enviar un mensaje al tutor explicando el motivo.'
            }
          </p>
        </div>

        <label className="block text-[16px] font-ibm font-semibold text-(--dark-blue) py-[5px] mb-[14px]">
          Motivo *
        </label>

        <div className="flex flex-col gap-[13px] mb-[21px]">
          {reasons.map((reason, index) => (
            <label
              key={index}
              className="flex items-center w-full h-[38px] gap-[14px] border border-(--grey-border) rounded-lg px-[14px] py-[10px] cursor-pointer"
            >
              <input
                type="radio"
                value={reason}
                checked={selectedReason === reason}
                onClick={() => handleReasonChange(reason)}
                className="w-[16px] h-[16px] accent-(--dark-blue)"
                {...register('cancellationReason', {
                  required: 'Por favor, elige un motivo',
                })}
              />
              <span className="font-inter text-[14px] text-(--dark-blue)">
                {reason}
              </span>
            </label>
          ))}
          {errors.cancellationReason && (
            <p className={clsx('text-red-700 text-xs')}>
              {errors.cancellationReason.message?.toString()}
            </p>
          )}
        </div>

        <FormTextarea
          id={"cancellationMessage"}
          label={"Añadir un mensaje (Opcional)"}
          placeholder={
            isScheduled
              ? "Ej. No puedo debido a un cruce de horarios con otra tutoría"
              : "Ej. Encontré una tutoría más acorde a mis necesidades"
          }
          register={register}
          className="mb-[18px]"
          labelClassName="block text-[16px] font-ibm font-semibold text-(--dark-blue) mb-[8px]"
          textareaClassName="w-full h-[63px] border border-(--grey-border) rounded-[8px]  text-[14px] px-[14px] pt-[5px] pb-[28px]"
          errors={errors}
          errorClassName="error-message"
          maxLength={100}
        />

        <div className="flex justify-end gap-[12px]">
          <button
            type="button"
            className="w-[164px] h-[40px] btn-dark-blue font-lato  text-[18px] font-semibold"
            onClick={onClose}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="h-[40px] btn-dark-yellow font-lato px-[20px] text-[18px] font-semibold"
          >
            {
              isScheduled
                ? "Confirmar Cancelación"
                : "Cancelar Solicitud"
            }
          </button>
        </div>
      </form>

    </div>
  );
};