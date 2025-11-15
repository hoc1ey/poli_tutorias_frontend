"use server";

import { Schedule, ScheduleResponse } from "../../interfaces";
import { fetchApi } from "../fetchApi";

export const setSchedule = async (data: Schedule): Promise<ScheduleResponse> => {

  try {


    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: "follow"
    };

    const result = await fetchApi("/schedule", requestOptions)

    return await result.json()

  } catch (error) {

    return {
      success: false,
      message: "Error al crear el horario",
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: "/schedule",
      data: { days: [] },
    }

  }

}