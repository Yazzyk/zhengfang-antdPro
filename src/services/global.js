import request from '@/utils/request';

export async function getToken() {
  return request('/api/user/token');
}

// 获取后端枚举类型字典
export async function getDictionaries() {
  return request('/api/dictionaries/enums')
}