import { Offer } from "@/interfaces"
import { StudentOfferGridItem } from "@/components";
import { TutorOfferGridItem } from "@/components";
import Link from "next/link";

interface Props {
  offers: Offer[] | null;
  role: 'tutor' | 'student';
}


export const OfferGrid = ({ offers, role }: Props) => {

  const CardType = role === 'tutor' ? TutorOfferGridItem : StudentOfferGridItem

  return (
    <div className="items-center align-middle">

      {

        offers!.map((offer) => {
          return (
            <div key={offer.id} className="my-[36px]">
              {role === 'student' ? (
                <Link href={`/student/offer/${offer.id}`}>
                  <CardType offer={offer} />
                </Link>
              ) : (
                <CardType offer={offer} />
              )}
              <hr className="text-(--grey) my-[36px]" />
            </div>
          );
        })
      }

    </div>
  )
}

