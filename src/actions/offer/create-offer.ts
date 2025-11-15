'use server'

import { CareersSubjectResponse } from "../../interfaces"
import { fetchApi, getUserSession } from "@/actions";

export const createOffer = async (formdata: FormData): Promise<CareersSubjectResponse> => {

  try {

    const requestOptions: RequestInit = {
      method: "POST",
      body: formdata,
      redirect: "follow"
    };

    const response = await fetchApi(`/offer/new`, requestOptions);
    const result = await response.json();
    return result

  } catch (error: any) {
    return {
      success: false,
      message: error.message as string,
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: '/offer/new',
      data: [] as any,
    }
  }

}