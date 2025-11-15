import { Subject } from "./subject-interface";

export interface Career {
  careerId: string;
  careerName: string;
  subjects: Subject[] | null;
}
