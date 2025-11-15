'use server';

import { ScheduleResponse } from "@/interfaces";
import { fetchApi } from "../fetchApi";

export const getSchedule = async (): Promise<ScheduleResponse> => {

  try {

    const requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow"
    };

    const result = await fetchApi('/schedule/my-schedules', requestOptions)

    return await result.json()

  } catch (error) {

    return {
      success: false,
      message: 'Error al obtener el horario',
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: '/schedule/my-schedules',
      data: { days: [] }
    }

  }

}