import React from 'react'

interface Props {
  offerDescription: string;
  offerIndications: string;
}

export const OfferDescriptionCard = ({ offerDescription, offerIndications }: Props) => {
  return (
    <div
      className="offer-detail-card gap-4 ">
      <div>
        <span className="offer-detail-section-title">Descripción</span>
        <p className="offer-detail-section-content break-words whitespace-pre-wrap">{offerDescription}</p>
      </div>
      <div>
        <span className="offer-detail-section-title">Indicaciones</span>
        <p className="offer-detail-section-content">{offerIndications}</p>
      </div>
    </div>
  )
}
