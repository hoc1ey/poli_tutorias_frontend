'use server'

import { revalidatePath } from "next/cache";
import { CareersSubjectResponse } from "../../interfaces"
import { fetchApi } from "@/actions";

export const createOffer = async (formdata: FormData): Promise<CareersSubjectResponse> => {

  try {

    const requestOptions: RequestInit = {
      method: "POST",
      body: formdata,
      redirect: "follow"
    };

    const response = await fetchApi(`/offer/new`, requestOptions);
    const result = await response.json();

    if (result.success) {
      revalidatePath('/tutor/offers')
      revalidatePath('/student')
    }

    return result

  } catch (error) {

    return {
      success: false,
      message: "Unknown error",
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: '/offer/new',
      data: {
        faculty: '',
        careers: []
      },
    };

  }

  return {
    success: false,
    message: "Unknown error",
    statusCode: 500,
    timestamp: new Date().toISOString(),
    path: '/offer/new',
    data: {
      faculty: '',
      careers: []
    },
  };

}