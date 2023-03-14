type PageResponse<T> = {
  items: T[];
  totalCount: number;
  pageSize: number;
  pageNumber: number;
  totalPages: number;
};

export default PageResponse;
