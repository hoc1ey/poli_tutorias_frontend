import { StudentRequest } from "@/interfaces"

export interface PaginatedStudentRequests {
  totalItems: number;
  limit: number;
  currentPage: number;
  totalPages: number;
  requests: StudentRequest[]
}