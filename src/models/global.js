import { queryNotices } from '@/services/user';
import { getToken, getDictionaries } from '@/services/global';
import { storage } from '../utils/storage';

const GlobalModel = {
  namespace: 'global',
  state: {
    collapsed: false,
    notices: [],
    dictionaries: {},
  },
  effects: {
    *fetchNotices(_, { call, put, select }) {
      const data = yield call(queryNotices);
      yield put({
        type: 'saveNotices',
        payload: data,
      });
      const unreadCount = yield select(
        state => state.global.notices.filter(item => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: data.length,
          unreadCount,
        },
      });
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

    *getDictionaries(_, {call, put}) {
      // 从后端获取字典
      const dictionaries = yield call(getDictionaries)
      console.log(dictionaries)
      yield put({
        type: 'saveDictionaries',
        payload: dictionaries,
      })
    },

    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count = yield select(state => state.global.notices.length);
      const unreadCount = yield select(
        state => state.global.notices.filter(item => !item.read).length,
      );
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: count,
          unreadCount,
        },
      });
    },

    *changeNoticeReadState({ payload }, { put, select }) {
      const notices = yield select(state =>
        state.global.notices.map(item => {
          const notice = { ...item };

          if (notice.id === payload) {
            notice.read = true;
          }

          return notice;
        }),
      );
      yield put({
        type: 'saveNotices',
        payload: notices,
      });
      yield put({
        type: 'user/changeNotifyCount',
        payload: {
          totalCount: notices.length,
          unreadCount: notices.filter(item => !item.read).length,
        },
      });
    },
  },
  reducers: {
    changeLayoutCollapsed(
      state = {
        notices: [],
        collapsed: true,
      },
      { payload },
    ) {
      return { ...state, collapsed: payload };
    },
    changeCaptChaSrc(state) {
      const time = new Date().getTime();
      return { ...state, captChaSrc: `/api/user/captcha?path=${time}&token=${state.token}` };
    },
    saveNotices(state, { payload }) {
      return {
        collapsed: false,
        ...state,
        notices: payload,
      };
    },
    saveToken(state, { payload }) {
      storage.save('token', payload.item);
      return { ...state, token: payload.item };
    },
    saveDictionaries(state, {payload}) {
      return { ...state, dictionaries: payload.item }
    },
    saveClearedNotices(
      state = {
        notices: [],
        collapsed: true,
      },
      { payload },
    ) {
      return {
        collapsed: false,
        ...state,
        notices: state.notices.filter(item => item.type !== payload),
      };
    },
  },
  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
export default GlobalModel;
