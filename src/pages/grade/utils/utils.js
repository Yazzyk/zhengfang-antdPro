export const gradeUtil = {
  getGradeScorePoint: (text) => {
    const reg = /[\u4e00-\u9fa5]/g;
    const symbolReg = /：/;
    return text.replace(reg, '').replace(symbolReg, '');
  },
  getNumberOfString(text) {
    return text.match(/\d+/g);
  },
  getDoubleNumOfString(text) {
    return text.match(/\d+(.\d+)?/g);
  },
};
