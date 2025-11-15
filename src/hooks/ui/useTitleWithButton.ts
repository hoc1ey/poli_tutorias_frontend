'use client';

import { useScheduleStore } from '@/store';
import { useAppModal } from './useAppModal';
import { setSchedule } from '../../actions';
import { useRouter } from 'next/navigation';

interface ActionHandlers {
  [key: string]: () => void;
}

export const useTitleWithButton = (action?: string) => {
  const { weeklySchedule, clearSchedule } = useScheduleStore();
  const { openError, openCheck } = useAppModal();
  const router = useRouter()

  const handleSaveSchedule = async () => {
    const hasAvailableSlots = weeklySchedule.days.some(day =>
      day.slots!.some(slot => slot.state === 'available')
    );

    if (!hasAvailableSlots) {
      openError({
        message: 'Por favor, selecciona al menos un horario disponible',
        btnText: 'Cerrar'
      });
      return;
    }

    const result = await setSchedule(weeklySchedule);

    if (!result.success) {
      openError({
        message: result.message,
        btnText: 'Reintentar',
        onConfirm: handleSaveSchedule,
      });
      return;
    }

    openCheck({
      title: 'Horario guardado',
      message: 'Tu disponibilidad ha sido guardada. Los estudiantes ya pueden ver tus horas libres para solicitar tutorías.',
      btnText: 'Ir a Mis Ofertas',
      onConfirm: () => {
        router.push('/tutor/offers')
      },
    },
      () => {
        router.refresh();
      })

    clearSchedule();

    return;
  };


  const actionHandlers: ActionHandlers = {
    'tutor/schedule/create': handleSaveSchedule,
  };

  const executeAction = () => {
    if (action && actionHandlers[action]) {
      actionHandlers[action]();
    }
  };

  return {
    executeAction
  };
};
