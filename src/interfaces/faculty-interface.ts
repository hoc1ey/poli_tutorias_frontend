import { Career } from "./career-interface";

export interface Faculty {
  facultyId: string;
  faculty: string;
  careers?: Career[];
}
