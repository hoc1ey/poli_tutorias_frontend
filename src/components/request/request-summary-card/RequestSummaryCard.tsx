'use client';

import React, { useEffect, useState } from 'react'
import { HiInformationCircle } from 'react-icons/hi';
import { useRequestStore } from '@/store';
import { formatTimeSlot } from '@/utils';
import './RequestSummaryCard.css';
import { useAppModal } from '../../../hooks';
import { Tutor } from '../../../interfaces';

interface Props {
  offerPrice: number;
  tutor: Tutor;
}

export const RequestSummaryCard = ({ offerPrice, tutor }: Props) => {

  const { day, hours, paymentMethod, setPaymentMethod, price, setPrice } = useRequestStore();

  const { openError, openRequest } = useAppModal()

  useEffect(() => {
    setPrice(offerPrice);
  }, [offerPrice, setPrice]);

  const totalHours = hours.length;
  const totalPrice = totalHours * price;
  const hasSelection = day && hours.length > 0;

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    if (!day) {
      openError({
        message: 'Por favor, selecciona una fecha y hora.',
        btnText: 'Cerrar'
      });
      setIsSubmitting(false)
      return;
    }

    if (hours.length === 0) {
      openError({
        message: 'Por favor, selecciona una fecha y hora.',
        btnText: 'Cerrar'
      });
      setIsSubmitting(false)

      return;
    }

    if (!paymentMethod) {
      openError({
        message: 'Por favor, selecciona un método de pago.',
        btnText: 'Cerrar'
      });
      setIsSubmitting(false)

      return;
    }

    openRequest({ tutor })

    setIsSubmitting(false)
  }

  return (
    <div className="offer-detail-card request-summary-container">
      <div className="request-price-container">
        <span className="request-price-value">${price}</span>
        <p className="offer-detail-section-content request-price-unit">/hora</p>
      </div>

      <div className='request-selection-box'>
        <p className='request-selection-title'>Tu selección:</p>

        {!hasSelection ? (
          <p className='request-no-selection-message'>Aún no has seleccionado un horario</p>
        ) : (
          <div>
            {hours.map((hour, index) => (
              <p key={index} className='request-time-slot'>
                {formatTimeSlot(day!, hour)}
              </p>
            ))}
          </div>
        )}

        <hr className='request-divider' />

        <span className='request-total-label'>
          Total: {hasSelection ? `$${totalPrice}` : '-'}
        </span>
      </div>

      {!hasSelection && (
        <p className='request-choose-message'>Elige un horario para la tutoría</p>
      )}

      <span className='request-payment-title'>Método de pago</span>

      <div className="request-payment-options">
        <label className="request-payment-label">
          <input
            type="radio"
            name="paymentMethod"
            value="cash"
            checked={paymentMethod === 'cash'}
            onChange={() => setPaymentMethod('cash')}
          />
          <span className='request-payment-text'>Efectivo</span>
        </label>
        <label className="request-payment-label">
          <input
            type="radio"
            name="paymentMethod"
            value="transfer"
            checked={paymentMethod === 'transfer'}
            onChange={() => setPaymentMethod('transfer')}
          />
          <span className='request-payment-text'>Transferencia</span>
        </label>
      </div>

      <div className='request-info-box'>
        <div className='request-info-icon-wrapper'>
          <HiInformationCircle size={19} className='text-(--dark-blue)' />
        </div>
        <p className='request-info-text'>
          El pago debe coordinarse con el tutor después de haber recibido la tutoría
        </p>
      </div>

      <button
        type='submit'
        onClick={handleSubmit}
        className='w-full btn-dark-yellow request-submit-button font-bold flex items-center justify-center'>
        {
          isSubmitting ? (
            <div className="h-5 w-5 border-2 border-(--dark-blue) spin-animation"></div>
          ) : (
            'Solicitar tutoría'
          )
        }
      </button>
    </div >
  )
}
