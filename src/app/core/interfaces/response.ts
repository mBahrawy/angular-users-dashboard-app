export interface Response<T> extends PaginationData {
  data: T;
  support?: Support | null;
}

export interface Support {
  url: string;
  text: string;
}

export interface PaginationData {
  page: number;
  per_page: number;
  total: number | null;
  total_pages: number | null;
}
