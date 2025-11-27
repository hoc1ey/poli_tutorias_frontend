import { Offer } from "./offer-interface";

export interface StudentRequest {
  requestId: string,
  date: string,
  hours: string[],
  price: number,
  paymentMethod: 'cash' | 'transfer',
  status: 'pending' | 'conflict' | 'scheduled',
  offer: Offer
}