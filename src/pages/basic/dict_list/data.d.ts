export interface DictListItem {
  key: string;
  title: string;
  name?: string;
  isLeaf?: boolean;
  code?: string;
  sorter?: number;
  remark?: string;
  children?: DictListItem[];
}

export interface DictListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface DictListData {
  list: DictListItem[];
  pagination: Partial<DictListPagination>;
}

export interface DictListParams {
  sorter?: {
    [key: string]: string;
  };
  filter?: {
    [key: string]: React.ReactText[];
  };
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
