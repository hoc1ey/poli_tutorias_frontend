export const dynamic = 'force-dynamic';

import { Title, SectionMenu, Pagination, RequestsTable } from "@/components";
import { redirect } from "next/navigation";
import { getPaginatedTutorRequests } from "@/actions";

export const metadata = {
  title: 'Solicitudes',
  description: 'Visualiza las solicitudes que has recibido.',
};

const menuItems = [
  {
    title: 'Bandeja de Entrada',
    query: 'inbox',
    isDefault: true,
  },
]

const getValidQueries = () => {
  return menuItems.map(item => item.query);
}

interface Props {
  searchParams: {
    page?: string;
    query?: string;
  }
}

export default async function TutorRequestsPage({ searchParams }: Props) {

  const params = await searchParams;

  let page = params.page || 1;
  page = isNaN(+page) ? 1 : +page;
  if (page < 1) page = 1;

  const { data, success, message } = await getPaginatedTutorRequests({ page });

  const requests = data.requests || [];
  const totalPages = data?.totalPages || 0;
  const currentPage = data?.currentPage || 1;

  currentPage > totalPages && totalPages > 0 && redirect('/tutor/requests')

  return (
    <div className="px-[34px] pt-[40px]">
      <Title
        title={"Solicitudes"}
        description={"Consulta tus solicitudes de tutorías, las que hayas aceptado, y tu historial."}
      />

      <div className="flex flex-col min-h-[70vh] mt-[30px] mx-[30px]">
        <SectionMenu menuItems={menuItems} validQueries={getValidQueries()} />

        {
          !success ? (
            <div className="flex justify-center items-center min-h-[50vh]">
              <p className={`font-montserrat text-l font-bold text-(--grey-blue)`}>{message || 'Error al cargar las ofertas.'}</p>
            </div>
          ) : requests.length === 0 ? (
            <div className="flex justify-center items-center min-h-[50vh]">
              <p className={`font-montserrat text-l font-bold text-(--grey-blue)`}>No tienes solicitudes pendientes</p>
            </div>
          ) : (
            <>
              <RequestsTable
                requests={requests}
              />
              <div className="mt-auto pt-8">
                <Pagination totalPages={totalPages} />
              </div>
            </>
          )
        }



      </div>
    </div>
  );
}