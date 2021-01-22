import { request } from 'umi';
import { OrgListParams, OrgListItem } from './data';

export async function queryOrg(params?: OrgListParams) {
  return request('/api/v1/org', {
    params,
  });
}

export async function removeOrg(ids: string) {
  return request(`/api/v1/org/${ids}`, { method: 'DELETE' });
}

export async function addOrg(params: OrgListItem) {
  return request('/api/v1/org', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateOrg(params: OrgListParams) {
  return request('/api/v1/org', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
