export type PagablePayload<T> = {
  content: T[];
  totalPages: number;
  number: number;
  totalElements: number;
}
