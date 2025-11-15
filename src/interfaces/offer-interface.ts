import { Tutor } from "./tutor-interface";

export interface Offer {
  id?: string;
  slug: string;
  subject: string;
  career: string;
  price: number;
  description: string;
  indications: string;
  mode: string;
  image: string;
  createdAt: Date;
  tutor?: Tutor;
}
