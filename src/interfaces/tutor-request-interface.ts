export interface TutorRequest {
  requestId: string,
  createdAt: Date,
  date: Date,
  hours: string[],
  price: number,
  paymentMethod: 'cash' | 'transfer',
  status: 'pending' | 'conflict' | 'expired',
  student: {
    studentName: string,
    studentEmail: string,
    studentPhone: string,
    studentMessage?: string,
  }
  subjectName: string;
  isReviewed: boolean
  offer: {
    offerMode: 'online' | 'in-person',
    offerIndications: string,
  }
}