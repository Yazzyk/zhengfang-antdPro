import request from '@/utils/request';

export async function getToken() {
  return request('/api/user/token');
}