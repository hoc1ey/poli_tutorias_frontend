import { Offer } from "@/interfaces";

export interface PaginatedOffers {
  totalItems: number;
  limit: number;
  currentPage: number;
  totalPages: number;
  offers: Offer[];
}