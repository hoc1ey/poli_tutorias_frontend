export const dynamic = 'force-dynamic';
import { getCareersAndSubjects, getSchedule } from '@/actions';
import { PublishOffer } from '@/components';
import { ResolvingMetadata, Metadata } from 'next';

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const slug = (await params).slug

  if (slug === 'new') {
    return {
      title: 'Publicar Oferta',
      description: 'Crea una nueva oferta.'
    }
  }

  return {
    title: 'Publicar Oferta',
    description: 'Crea una nueva oferta.'
  }

  //TODO: Condicional para editar tutorías

  // // fetch post information
  // const product = await getProductBySlug(slug);

  // return {
  //   title: product?.title,
  //   description: product?.description,
  //   openGraph: {
  //     title: product?.title,
  //     description: product?.description,
  //     images: [`/products/${product?.images[1]}`]
  //   }
  // }
}


interface Props {
  params: {
    slug: string;
  }
}


export default async function OfferPage({ params }: Props) {

  const { data } = await getCareersAndSubjects()

  const result = await getSchedule();

  return (
    <main className='mx-5 md:mx-[50px] my-3 md:my-5'>
      <PublishOffer availableCareersAndSubjects={data} hasSchedule={result.data.days.length !== 0} />
    </main>
  );
}