import { queryCurrent, query as queryUsers } from '@/services/user';
import { storage } from '@/utils/storage';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent({ callback }, { call, put }) {
      const response = yield call(queryCurrent, storage.find('token'));
      if (response.result === 'success') {
        response.item.avatar = 'https://img.css0209.cn/img/avatar/default.jpg'
        yield put({
          type: 'saveCurrentUser',
          payload: response,
        });
      }
      if (callback && typeof callback === 'function') {
        callback();
      }
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload.item || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
