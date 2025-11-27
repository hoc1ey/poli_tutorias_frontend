'use server';

import { fetchApi } from "../fetchApi";

export const changeReviewedStatus = async (requestId: string) => {

  try {

    const requestOptions: RequestInit = {
      method: "PATCH",
      redirect: "follow"
    };

    const response = await fetchApi(`/request/reviewedChangeStatus/${requestId}`, requestOptions)

    const result = await response.json();

    return result;

  } catch (error) {
    return {
      success: false,
      message: 'Error al obtener los detalles de la tutoría.'
    }
  }

}