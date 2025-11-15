export interface Response<T> {
  success: boolean;
  message: string;
  errorCode?: string;
  statusCode: number;
  timestamp: string;
  path: string;
  errors?: Error[];
  data: T;
}
