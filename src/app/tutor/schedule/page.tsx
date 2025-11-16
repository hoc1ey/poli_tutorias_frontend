export const dynamic = 'force-dynamic';

import { getSchedule } from '../../../actions';
import { Schedule } from '../../../components';
import { TitleWithButton } from '../../../components/ui/title-with-button/TitleWithButton';


const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export default async function MySchedulePage() {

  const result = await getSchedule();

  const schedule = result.data;
  const isEditable = schedule.days.length === 0 || !schedule;

  const getWeekDateFormatted = () => {

    const weekStart = schedule.weekStart!.toString().split('-');
    const weekEnd = schedule.weekEnd!.toString().split('-');
    const monthStart = monthNames[+weekStart[1] - 1];
    const monthEnd = monthNames[+weekEnd[1] - 1];
    const yearStart = weekStart[0];
    const yearEnd = weekEnd[0];

    if (yearStart === yearEnd) {

      if (monthStart === monthEnd) {
        return `Semana del ${weekStart[2]} al ${weekEnd[2]} de ${monthStart}, ${yearStart}`
      }

      return `Semana del ${weekStart[2]} de ${monthStart} al ${weekEnd[2]} de ${monthEnd}, ${yearStart}`

    }

    return `Semana del ${weekStart[2]} de ${monthStart} de ${yearStart} al ${weekEnd[2]} de ${monthEnd} de ${yearEnd}`

  }

  return (
    <div>

      <TitleWithButton
        title={'Mi Horario'}
        description={isEditable
          ? 'Selecciona los rangos de tiempo en los que deseas ofrecer tus tutorías, este horario será el mismo para todas las semanas.'
          : 'Consulta aquí tu horario para impartir tutorías.'}
        btnText={isEditable ? 'Guardar' : 'Volver a Inicio'}
        {...(isEditable
          ? { btnAction: 'tutor/schedule/create' }
          : { btnHref: '/tutor/offers' }
        )}
      />

      {
        !isEditable && (
          <h2 className='mt-7 font-inter font-bold text-[20px] text-(--dark-blue) text-center'>{getWeekDateFormatted()}</h2>
        )
      }

      {
        result.success ? (
          <Schedule weeklyScheduleProp={schedule} isEditable={isEditable} />
        ) : (
          <div className="flex justify-center items-center min-h-[50vh]">
            <p className="offer-grid-no-content">Error al cargar el horario.</p>
          </div>
        )
      }

    </div>
  );
}