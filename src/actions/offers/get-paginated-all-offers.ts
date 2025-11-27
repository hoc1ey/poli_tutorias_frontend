'use server';

import { PaginatedOffersResponse } from "../../interfaces";
import { fetchApi } from "../fetchApi";

interface PaginatedOptions {
  page?: number;
  query?: string;
}

export const getPaginatedAllOffers = async ({ page = 1, query }: PaginatedOptions): Promise<PaginatedOffersResponse> => {

  const limit = 10;
  const offset = (page - 1) * limit;
  const url = query
    ? `/offer/oferts?limit=${limit}&offset=${offset}&query=${query}`
    : `/offer/oferts?limit=${limit}&offset=${offset}`;

  try {
    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow"
    };

    const response = await fetchApi(url, requestOptions);
    return await response.json();

  } catch (error) {
    return {
      success: false,
      message: 'Error al consultar las tutorías',
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: url,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: null as any
    }
  }

}