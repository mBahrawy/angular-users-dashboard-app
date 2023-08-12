export interface Response<T> {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T;
  support?: Support | null;
}

export interface Support {
  url: string;
  text: string;
}
