export interface Response<T> {
  data: T;
  support?: Support | null;
}
export interface PaginationData {
  page: number;
  per_page: number;
  total: number | null;
  total_pages: number | null;
}

export interface PaginatedResponse<T> extends Response<T>, PaginationData {}

export interface Support {
  url: string;
  text: string;
}
