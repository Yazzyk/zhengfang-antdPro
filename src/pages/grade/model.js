import { storage } from '@/utils/storage';
import { queryFailGrade, queryGrade } from './service';

const Model = {
  namespace: 'grade',

  state: {
    failedGrade: undefined,
    statistics: undefined,
    gradeSource: [],
  },

  effects: {
    *failGrade(_, { call, put }) {
      const response = yield call(queryFailGrade);
      yield put({
        type: 'saveFailGrade',
        payload: response.item.failedGrade,
      });
    },
    *fetchGrade({ payload }, { call, put }) {
      const data = { ...payload };
      const response = yield call(queryGrade, data);
      if (payload.btn === 'Button1') {
        response.item.gradeStatistics.data2.forEach((element, index) => {
          // eslint-disable-next-line no-param-reassign
          element.key = index;
        });
        // response.item.gradeStatistics.data6.forEach((element, index) => {
        //   // eslint-disable-next-line no-param-reassign
        //   element.key = index;
        // });
        response.item.gradeStatistics.data7.forEach((element, index) => {
          // eslint-disable-next-line no-param-reassign
          element.key = index;
        });
        yield put({
          type: 'saveStatistics',
          payload: response.item.gradeStatistics,
        });
        return;
      }
      response.item.grade.forEach((element, index) => {
        // eslint-disable-next-line no-param-reassign
        element.key = index;
      });
      yield put({
        type: 'saveGrade',
        payload: response.item.grade,
      });
    },
  },
  reducers: {
    saveFailGrade(state, action) {
      return { ...state, failedGrade: action.payload };
    },
    saveGrade(state, { payload }) {
      return { ...state, gradeSource: payload };
    },
    saveStatistics(state, { payload }) {
      return { ...state, statistics: payload };
    },
  },
};

export default Model;
