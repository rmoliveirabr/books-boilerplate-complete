export type SearchParams = {
    page: string
    pageSize: string
    query?: string // TODO: improve to receive the field as Record<string, string>
}
  