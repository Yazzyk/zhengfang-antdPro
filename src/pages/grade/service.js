import request from 'umi-request';

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFailGrade() {
  return request(`/api/user/failedGrade`)
}

export async function queryGrade(payload) {
  return request(
    `/api/user/selectGrade?year=${payload.year}&semester=${payload.semester}&courseNature=${payload.courseNature}&btn=${payload.btn}`
  )
}
