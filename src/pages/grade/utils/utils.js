export const gradeUtil = {
  getGradePointAverage: (text) => {
    const reg = /[\u4e00-\u9fa5]/g;
    const symbolReg = /：/;
    return text.replace(reg,'').replace(symbolReg,'');
  }
}