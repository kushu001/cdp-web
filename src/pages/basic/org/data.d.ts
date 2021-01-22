export interface OrgListItem {
  id: number;
  disabled?: boolean;
  name: string;
  manager: string;
  managerId: number;
  tel: string;
  order: number;
  status: string;
}

export interface OrgListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface OrgListData {
  list: OrgListItem[];
  pagination: Partial<OrgListPagination>;
}

export interface OrgListParams {
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
