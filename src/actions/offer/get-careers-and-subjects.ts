"use server";

import { CareersSubjectResponse } from "@/interfaces";
import { fetchApi } from "../fetchApi";
import { getUserSession } from "..";

export const getCareersAndSubjects =
  async (): Promise<CareersSubjectResponse> => {
    let user;
    try {
      user = await getUserSession();

      if (!user) throw new Error("Usuario no encontrado");

      const requestOptions: RequestInit = {
        method: "GET",
        redirect: "follow",
      };

      const response = await fetchApi(
        `/offer/available-subjects`,
        requestOptions
      );
      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: "Error al obtener las carreras",
        statusCode: 500,
        timestamp: new Date().toISOString(),
        path: `/tutor/careers/${user!.dni || ""}`,
        data: { faculty: "", careers: [] },
      };
    }
  };
