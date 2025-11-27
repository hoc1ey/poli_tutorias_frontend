import { TutorRequest } from "@/interfaces"

export interface PaginatedTutorRequests {
  totalItems: number;
  limit: number;
  currentPage: number;
  totalPages: number;
  requests: TutorRequest[]
}