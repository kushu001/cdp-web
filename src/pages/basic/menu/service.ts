import { request } from 'umi';
import { MenuListParams, MenuListItem } from './data';

export async function queryMenu(params?: MenuListParams) {
  return request('/api/v1/menu', {
    params,
  });
}

export async function queryAllMenu() {
  return request('/api/v1/menu/all');
}

export async function removeMenu(id: number) {
  return request(`/api/v1/menu/${id}`, { method: 'DELETE' });
}

export async function addMenu(params: MenuListItem) {
  return request('/api/v1/menu', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateMenu(params: MenuListParams) {
  return request('/api/v1/menu', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
