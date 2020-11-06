export interface UserListItem {
  id: number;
  disabled?: boolean;
  name: string;
  gender: string;
  tel: string;
  addr: string;
  company: string;
  status: string;
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
