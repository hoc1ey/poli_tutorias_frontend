
export interface Request {
  offerId: string;
  createdAt?: Date;
  studentEmail: string;
  studentPhone: string;
  studentMessage?: string;
  date: string;
  price?: number;
  hours: string[];
  paymentMethod: 'cash' | 'transfer'
  status?: 'pending' | 'conflict' |
  'expired' | 'scheduled' | 'rejected' |
  'in-progress' | 'cancelled-tutor' |
  'cancelled-student' | 'finished' | 'completed';
  cancellationReason?: string;
  cancellationMessage?: string;
}