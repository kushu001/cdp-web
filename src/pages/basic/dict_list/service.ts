import { request } from 'umi';
import { UserListParams, DictListItem } from './data';

export async function queryUser(params?: UserListParams) {
  return request('/api/v1/user', {
    params,
  });
}

export async function removeUser(ids: string) {
  return request(`/api/v1/user/${ids}`, { method: 'DELETE' });
}

export async function addUser(params: DictListItem) {
  return request('/api/v1/user', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateUser(params: UserListParams) {
  return request('/api/v1/user', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
