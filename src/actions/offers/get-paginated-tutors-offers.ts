'use server';

import { PaginatedOffersResponse } from "../../interfaces";
import { fetchApi } from "../fetchApi";

export interface PaginatedOptions {
  page?: number;
}

export const getPaginatedTutorsOffers = async ({ page = 1 }: PaginatedOptions): Promise<PaginatedOffersResponse> => {

  const limit = 10;
  const offset = (page - 1) * limit;

  try {

    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow"
    };

    const response = await fetchApi(`/offer/user/?limit=${limit}&offset=${offset}`, requestOptions)
    return await response.json();

  } catch (error) {

    return {
      success: false,
      message: 'Error al consultar las tutorías',
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: `/offer/user`,
      data: {
        offers: [],
        totalItems: 0,
        limit: 0,
        currentPage: 0,
        totalPages: 0
      }
    }
  };

}