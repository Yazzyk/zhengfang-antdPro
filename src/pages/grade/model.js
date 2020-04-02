import { storage } from '@/utils/storage';
import { queryFailGrade, queryGrade } from './service';

const Model = {
  namespace: 'grade',

  state: {
    failedGrade: undefined,
    statistics: undefined,
    grade: undefined
  },

  effects: {
    *failGrade(_, { call, put }) {
      const response = yield call(queryFailGrade, storage.find('token'));
      yield put({
        type: 'saveFailGrade',
        payload: response.item.failedGrade
      });
    },
    *fetchGrade({ payload }, { call, put }) {
      const data = { ...payload, token: storage.find('token') }
      const response = yield call(queryGrade, data);
      response.item.gradeStatistics.data2.forEach((element,index) => {
        element.key = index;
      });
      response.item.gradeStatistics.data6.forEach((element,index) => {
        element.key = index;
      });
      response.item.gradeStatistics.data7.forEach((element,index) => {
        element.key = index;
      });
      if (data.btn === 'Button1') {
        yield put({
          type: 'saveStatistics',
          payload: response.item.gradeStatistics,
        })
        return
      }
      yield put({
        type: 'saveGrade',
        payload: response.item.grade,
      })
    }
  },
  reducers: {
    saveFailGrade(state, action) {
      return { ...state, failedGrade: action.payload };
    },
    saveGrade(state, { payload }) {
      return { ...state, grade: payload };
    },
    saveStatistics(state, { payload }) {
      return { ...state, statistics: payload };
    }
  },
}

export default Model;
