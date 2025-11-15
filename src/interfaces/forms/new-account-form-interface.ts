export interface NewAccountFormInputs {
  name: string;
  lastName: string;
  dni: string;
  uniqueCode: string;
  primaryPhone: string;
  optionalPhone?: string;
  faculty: string;
  career: string;
  email: string;
  password: string;
  role: 'tutor' | ' student';
  bio: string;
}