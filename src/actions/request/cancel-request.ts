'use server';

import { CancelRequestFormInputs } from "../../interfaces";
import { fetchApi } from "../fetchApi";

type AllowedActions = 'cancel-student';

export const cancelRequest = async (requestId: string, action: AllowedActions, cancellationInfo: CancelRequestFormInputs) => {

  try {

    const url = `/request/reject-status?id=${requestId}&action=${action}`

    const requestOptions: RequestInit = {
      method: "PATCH",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cancellationInfo)
    };

    const response = await fetchApi(url, requestOptions)

    const result = await response.json();
    return result;

  } catch (error) {

    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error al cancelar la solicitud',
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: '/request/reject-status',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: null as any,
    }

  }

}