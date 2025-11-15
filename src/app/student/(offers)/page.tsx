export const dynamic = 'force-dynamic';

import { redirect } from "next/navigation";
import { getPaginatedAllOffers, getUserSession } from "@/actions";
import { OfferGrid, Pagination, SearchBar, SearchHero, Title, WelcomeCard } from "@/components";
import { montserrat } from "@/config/fonts";

export const metadata = {
  title: 'Inicio',
  description: 'Visualiza las ofertas disponibles.',
};

interface Props {
  searchParams: {
    page?: string;
    query?: string;
  }
}

const role = 'student';

export default async function StudentHomePage({ searchParams }: Props) {


  const params = await searchParams;

  let page = params.page || 1;
  page = isNaN(+page) ? 1 : +page;
  if (page < 1) page = 1;

  const user = await getUserSession();

  if (!user) {
    redirect('/auth/login')
  }

  const query = params.query;

  const noOffersMessage = query ? 'Ninguna coincidencia.' : 'Aún no hay ofertas disponibles.';

  const { data, success, message } = await getPaginatedAllOffers({ page, query });

  // Si hay error, mostrar valores por defecto
  const offers = data?.offers || [];
  const totalPages = data?.totalPages || 0;
  const currentPage = data?.currentPage || 1;

  currentPage > totalPages && totalPages > 0 && redirect('/student')


  return (
    <div className="mx-5 md:mx-20 my-3 md:my-5">
      <WelcomeCard name={user.name || ''} image={user.image || ''} />

      <SearchHero
        title={"Encuentra la tutoría perfecta para ti"}
        description={"Descubre las diversas opciones de tutorías que son ofertadas en la EPN, de estudiantes para estudiantes."}
        searchBarPlaceholder={"¿En qué materia buscas apoyo?"}
      />

      <div className="flex sm:justify-between sm:gap-[20px] w-full">

        {/* //TODO: FILTROS */}
        <div className="w-[250px]">

        </div>

        <div className="w-[1072px]">

          {
            !success ? (
              <div className="flex justify-center items-center min-h-[50vh]">
                <p className={`${montserrat.className} text-3xl font-bold text-(--grey-blue)`}>{message || 'Error al cargar las ofertas.'}</p>
              </div>
            ) : offers.length === 0 ? (
              <div className="flex justify-center items-center min-h-[50vh]">
                <p className={`${montserrat.className} text-3xl font-bold text-(--grey-blue)`}>{noOffersMessage}</p>
              </div>
            ) : (
              <div className="flex flex-col min-h-[55vh]">
                <OfferGrid offers={offers} role={role} />

                <div className="mt-auto pt-8">
                  <Pagination totalPages={totalPages} />
                </div>
              </div>
            )
          }

        </div>
      </div>

    </div>
  );
}