import { Response } from "@/interfaces";

interface LogoutData {
  message: string;
}

export type LogoutResponse = Response<LogoutData>;
