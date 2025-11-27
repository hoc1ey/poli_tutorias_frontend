'use server';

import { CreateRequestResponse, Request } from "@/interfaces";
import { fetchApi } from "../fetchApi";


export const createRequest = async (requestData: Request): Promise<CreateRequestResponse> => {

  try {
    const requestOptions: RequestInit = {
      method: "POST",
      body: JSON.stringify(requestData),
      redirect: "follow",
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await fetchApi('/request/new', requestOptions);

    const result = await response.json();

    return result;

  } catch (error) {

    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al crear la solicitud',
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: '/request/new',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: null as any,
    }

  }

}