export interface User {
  id: string;
  name: string;
  lastName: string;
  dni: string;
  uniqueCode: string;
  primaryPhone: string;
  optionalPhone: null;
  faculty: string;
  career: string;
  email: string;
  role: string[];
  bio: string;
  image: string;
  isActive: boolean;
  accessToken: string;
  refreshToken: string;
}
