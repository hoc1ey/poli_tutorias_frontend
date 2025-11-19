'use server';

import { PaginatedStudentRequestsResponse } from "@/interfaces";
import { fetchApi } from "../fetchApi";
import { studentRequestsSeedData } from "../../seed";

interface PaginatedOptions {
  page?: number;
}

export const getPaginatedStudentRequests = async ({ page = 1 }): Promise<PaginatedStudentRequestsResponse> => {

  const limit = 10;
  const offset = (page - 1) * limit;

  try {

    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow"
    };

    const response = await fetchApi(`/request/my-requests?limit=${limit}&offset=${offset}`, requestOptions);

    const result = await response.json();

    return result;

  } catch (error) {

    return {
      success: false,
      message: "Error fetching student requests",
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: "/request/my-requests",
      data: [] as any
    }

  }

}