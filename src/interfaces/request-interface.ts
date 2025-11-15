
export interface Request {
  offerId: string;
  studentEmail: string;
  studentPhone: string;
  studentMessage?: string;
  date: Date;
  hours: string[];
  paymentMethod: 'cash' | 'transfer'
}