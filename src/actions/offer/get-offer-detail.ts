'use server';

import { OfferDetailResponse } from "@/interfaces";
import { fetchApi } from "../fetchApi";

export const getOfferDetails = async (offerId: string): Promise<OfferDetailResponse> => {

  try {

    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow"
    };

    const response = await fetchApi(`/offer/detail/${offerId}`, requestOptions);
    return await response.json();

  } catch (error) {

    return {
      success: false,
      message: 'Error al consultar la oferta',
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: `/offer/detail/${offerId}`,
      data: null as any
    }

  }

}