export const dynamic = 'force-dynamic';

import { getPaginatedTutorsOffers, getUserSession } from "@/actions";
import { OfferGrid, Pagination, TitleWithButton, WelcomeCard } from "@/components";
import { redirect } from "next/navigation";

const role = 'tutor';

interface Props {
  searchParams: {
    page?: string;
  }
}


export const metadata = {
  title: 'Mis Ofertas',
  description: 'Visualiza las ofertas que has publicado.',
};

export default async function OffersPage({ searchParams }: Props) {

  const params = await searchParams;

  let page = params.page || 1;
  page = isNaN(+page) ? 1 : +page;
  if (page < 1) page = 1;

  const user = await getUserSession();

  if (!user) {
    redirect('/auth/login')
  }

  const { data, success, message } = await getPaginatedTutorsOffers({ page });

  const offers = data?.offers || [];
  const totalPages = data?.totalPages || 0;
  const currentPage = data?.currentPage || 1;

  currentPage > totalPages && totalPages > 0 && redirect('/tutor/offers')

  return (
    <div className="mx-5 md:mx-[50px] mt-3 md:mt-5">

      <WelcomeCard name={user.name || ''} image={user.image || ''} />

      <TitleWithButton
        title={"Mis Ofertas"}
        description={"Consulta aquí todas las tutorías que estás ofertando."}
        btnText={"Publicar Oferta"}
        btnHref="/tutor/offer/new" />

      <div className="flex sm:justify-between sm:gap-[20px] w-full mt-[21px]">

        {/* //TODO: FILTROS */}
        <div className="w-[250px]">

        </div>

        <div className="w-[1072px]">

          {/* <div className="flex justify-end">
            <SearchBar placeholder={"Busca tu tutoría por materia"} />
          </div> */}

          {
            !success ? (
              <div className="flex justify-center items-center min-h-[50vh]">
                <p className="offer-grid-no-content">{message || 'Error al cargar las ofertas.'}</p>
              </div>
            ) : offers.length === 0 ? (
              <div className="flex justify-center items-center min-h-[50vh]">
                <p className="offer-grid-no-content">Aún no has publicado ninguna oferta.</p>
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
  )
};