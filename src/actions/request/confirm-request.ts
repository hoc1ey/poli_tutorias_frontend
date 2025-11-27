'use server';

import { fetchApi } from "../fetchApi";

export const confirmRequest = async (requestId: string) => {

  try {

    const url = `/request/confirm?id=${requestId}&action=scheduled`

    const requestOptions: RequestInit = {
      method: "PATCH",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json"
      },
    };

    const response = await fetchApi(url, requestOptions)

    const result = await response.json();

    console.log(result)

    return result;

  } catch (error) {

    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al confirmar la solicitud',
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: '/request/reject-status',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: null as any,
    }

  }

}