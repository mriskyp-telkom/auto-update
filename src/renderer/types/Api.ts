interface ResponseMetadata {
  offset?: number
  limit?: number
  total?: number
}

export interface APIResponse<
  TData = Record<string, any>,
  TMeta = ResponseMetadata
> {
  data: TData
  meta: TMeta
}
