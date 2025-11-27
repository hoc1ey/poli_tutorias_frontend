export const dynamic = 'force-dynamic';

import { notFound } from "next/navigation";
import { getOfferDetails } from "@/actions";
import { AvailabilityCard, OfferDescriptionCard, OfferDetailHeader, RequestSummaryCard } from "@/components";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {

  const slug = (await params).slug

  const { data } = await getOfferDetails(slug);


  return {
    title: `${data.subject} | ${data.tutor?.name}`,
    description: `${data.description}`
  }


}

interface Props {
  params: {
    slug: string;
  }
}

export default async function OfferDetailsPage({ params }: Props) {

  const { slug } = await params;

  const { success, data } = await getOfferDetails(slug);

  if (!success) {
    notFound();
  }

  const offer = data;

  return (
    <div className="pb-[40px] bg-white">
      <OfferDetailHeader offer={offer} />

      <div className="pl-[50px] mt-[20px]">
        <Link href={'/student/'} >
          <div className="flex gap-[15px] text-(--grey-blue) font-inter font-semibold text-[20px] align-middle items-center justify-items-center">
            <IoMdArrowBack size={24} />
            Regresar al inicio
          </div>
        </Link>
      </div>


      <div className="flex gap-[35px] justify-between px-[50px] w-full mt-[20px]">

        <div className="flex flex-col gap-[23px] w-full max-w-7/10">
          <OfferDescriptionCard offerDescription={offer.description} offerIndications={offer.indications} />
          <h2 className="offer-detail-section-title">Disponibilidad del Tutor</h2>
          <AvailabilityCard schedule={offer!.tutor!.schedule} />
        </div>

        <div className="min-w-[341px]">
          <RequestSummaryCard offerPrice={offer.price} tutor={offer.tutor!} />
        </div>

      </div>
    </div>
  );
}