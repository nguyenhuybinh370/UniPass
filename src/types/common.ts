export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}
