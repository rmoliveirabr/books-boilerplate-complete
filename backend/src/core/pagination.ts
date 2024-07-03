export type Pagination = {
    page: number;
    pageSize: number;
    filters?: Record<string, string | undefined>;
    sorting?: {
      asc?: boolean;
      column?: string;
    };
  };
  