'use server';

import { FacultiesCareersResponse } from "../interfaces";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getFacultiesAndCareers = async (): Promise<FacultiesCareersResponse> => {

  try {

    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow"
    };

    const response = await fetch(`${BACKEND_URL}/catalogs/faculties`, requestOptions)
    const result: FacultiesCareersResponse = await response.json()

    return result;

  } catch (error) {

    return {
      success: false,
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: '/api/catalogs/faculties',
      message: 'Error fetching faculties and careers',
      data: []
    }

  }

}