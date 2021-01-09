import { request } from 'umi';
import { DictListParams, DictListItem } from './data';

export async function queryDict(params?: DictListParams) {
  return request('/api/v1/dict', {
    params,
  });
}

export async function removeDict(ids: string) {
  return request(`/api/v1/dict/${ids}`, { method: 'DELETE' });
}

export async function addDict(params: DictListItem) {
  return request('/api/v1/dict', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateDict(params: DictListItem) {
  return request('/api/v1/dict', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
