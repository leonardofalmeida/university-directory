export interface University {
  alpha_two_code: string;
  web_pages: string[];
  country: string;
  domain: string;
  name: string;
}

export interface PaginationProps {
  onPageChange: (_value: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
}

export interface HeaderProps {
  searchItems: (_value: string) => void;
}

export interface CardProps {
  item: University;
}
