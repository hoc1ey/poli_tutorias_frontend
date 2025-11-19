import { useParams, useRouter } from "next/navigation";
import { createRequest } from "../../actions";
import { useAppModal } from "./useAppModal";
import { useRequestStore, useSessionStore } from "../../store";
import { useForm } from "react-hook-form";
import { NewRequestFormInputs } from "../../interfaces";

export const useRequestModal = () => {
  const { day, hours, paymentMethod, price, resetRequest } = useRequestStore()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NewRequestFormInputs>()

  const { openError, openCheck } = useAppModal();

  const router = useRouter();

  const formattedPaymentMethod = paymentMethod === 'cash' ? 'Efectivo' : 'Transferencia';

  const { user } = useSessionStore();

  const params = useParams();

  const onSubmit = async (data: NewRequestFormInputs) => {

    const offerId = params.slug as string;

    const requestData = {
      offerId: offerId || '',
      studentEmail: data.studentEmail || user!.email!,
      studentPhone: data.studentPhone || user!.primaryPhone!,
      studentMessage: data.studentMessage,
      hours: hours.map(h => h.toString()),
      date: (day || new Date()).toISOString() as unknown as Date,
      paymentMethod: paymentMethod || 'cash',
    };

    const result = await createRequest(requestData);

    if (!result.success) {

      if (result.statusCode === 409) {

        openError({
          title: 'Error',
          message: 'No puedes solicitar el mismo día/hora. Por favor, selecciona una nueva diferente',
          btnText: 'Cerrar'
        })

        return;

      }

      openError({
        title: 'Error',
        message: 'Error al crear la tutoría',
        btnText: 'Cerrar'
      })
      return;
    }

    resetRequest();

    openCheck({
      title: 'Solicitud enviada exitosamente',
      message: 'Ahora puedes revisar el estado de la solicitud en tu panel de tutorías.',
      btnText: 'Ir a Mis Tutorías',

    },
      () => {
        router.replace('/student/requests')
      })

  }

  return {
    hours,
    day,
    price,
    formattedPaymentMethod,
    handleSubmit,
    onSubmit,
    register,
    errors,
    user,
    isSubmitting,

  }
}