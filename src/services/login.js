import request from '@/utils/request';

export async function AccountLogin(params) {
  return request('/api/user/login', {
    method: 'POST',
    data: params,
  });
}

export async function getToken() {
  return request('/api/user/token');
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
