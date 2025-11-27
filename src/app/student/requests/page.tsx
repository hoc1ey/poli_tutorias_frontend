export const dynamic = 'force-dynamic';

import { Pagination, RequestGrid, SectionMenu, Title } from "@/components";
import { getPaginatedStudentRequests } from "@/actions";
import { redirect } from "next/navigation";

export const metadata = {
  title: 'Mis Tutorías',
  description: 'Visualiza las solicitudes que has enviado.',
};

const menuItems = [
  {
    title: 'Mis Solicitudes',
    query: 'my-requests',
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

export default async function StudentRequestsPage({ searchParams }: Props) {

  const params = await searchParams;

  let page = params.page || 1;
  page = isNaN(+page) ? 1 : +page;
  if (page < 1) page = 1;

  const { data, success, message } = await getPaginatedStudentRequests({ page });

  const requests = data?.requests || [];
  const totalPages = data?.totalPages || 0;
  const currentPage = data?.currentPage || 1;

  currentPage > totalPages && totalPages > 0 && redirect('/student/requests')

  return (
    <div className="px-[34px] py-[40px]">
      <Title
        title={"Mis Tutorías Solicitadas"}
        description={"Aquí encontrarás el historial de todas tus tutorías solicitadas, separadas por Activas e Historial."}
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
              <p className={`font-montserrat text-l font-bold text-(--grey-blue)`}>No tienes solicitudes activas</p>
            </div>
          ) : (
            <div className="flex flex-col min-h-[55vh]">
              <RequestGrid type={"my-requests"} requests={data.requests} />

              <div className="mt-auto pt-8">
                <Pagination totalPages={totalPages} />
              </div>
            </div>
          )
        }


      </div>
    </div>
  );
}