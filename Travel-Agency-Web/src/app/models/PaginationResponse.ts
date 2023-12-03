export interface PaginationResponse<TResponse> {
  totalCollectionSize: number
  items: TResponse[]
}
