import { Schedule } from "./schedule-interface";

export interface Tutor {
  name: string;
  primaryPhone: string;
  image: string;
  schedule: Schedule;
}