import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}
export async function queryCurrent(token) {
  return request(`/api/user/info?token=${token}`);
}
export async function queryNotices() {
  return request('/api/notices');
}
