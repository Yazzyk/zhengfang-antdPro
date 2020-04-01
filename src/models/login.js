import { stringify } from 'querystring';
import { history } from 'umi';
import { AccountLogin, getToken } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { storage } from '../utils/storage';

const Model = {
  namespace: 'login',
  state: {
    token: undefined,
    status: undefined,
    captChaSrc: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const data = {
        username: payload.username,
        password: payload.password,
        captcha: payload.captcha,
        token: localStorage.getItem('token'),
      };
      const response = yield call(AccountLogin, data);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully

      if (response.result === 'success') {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        history.replace(redirect || '/');
      }
    },

    *getToken(_, { call, put }) {
      const response = yield call(getToken);
      yield put({
        type: 'saveToken',
        payload: response,
      });
      yield put({
        type: 'changeCaptChaSrc',
      });
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.result, type: payload.result, message: payload.msg };
    },
    saveToken(state, { payload }) {
      storage.save('token', payload.item.token);
      return { ...state, token: payload.item.token };
    },
    changeCaptChaSrc(state) {
      const time = new Date().getTime();
      return { ...state, captChaSrc: `/api/user/captcha?path=${time}&token=${state.token}` };
    },
  },
};
export default Model;
