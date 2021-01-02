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

export interface UserListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface UserListData {
  list: UserListItem[];
  pagination: Partial<UserListPagination>;
}

export interface UserListParams {
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
