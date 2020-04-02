import request from 'umi-request';

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFailGrade(token) {
  return request(`/api/user/failedGrade?token=${token}`)
}

export async function queryGrade(payload) {
  return request(
    `/api/user/selectGrade?year=${payload.year}&semester=${payload.semester}&courseNature=${payload.courseNature}&btn=${payload.btn}&token=${payload.token}`
  )
}
