import { request } from 'umi';
import { UserListParams, UserListItem } from './data';

export async function queryUser(params?: UserListParams) {
  return request('/api/v1/user', {
    params,
  });
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addUser(params: UserListItem) {
  return request('/api/v1/user', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateRule(params: UserListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
