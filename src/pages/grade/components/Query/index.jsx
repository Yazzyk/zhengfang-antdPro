import React, {Component} from 'react';
import {Card, Form, Select, Table} from 'antd';
import {connect} from '@/.umi/plugin-dva/exports';
import {ColData} from '../../data';
import styles from './styles.less';

const yearList = [];
const thisYear = new Date().getFullYear();
for (let i = 2001; i <= thisYear; i += 1) {
  yearList.push(`${i}-${i + 1}`);
}

@connect(({grade, loading}) => ({
  grade,
  loading: loading.models.grade,
}))
class Query extends Component {
  state = {
    year:         ``,
    semester:     '',
    courseNature: '',
    btn:          'Button2',
  };

  componentDidMount() {
    this.handleValueUpdate({}, this.state);
  }

  handleValueUpdate = (changeValue, allValue) => {
    this.setState(allValue);
    this.handleSubmit(allValue);
  };

  handleSubmit = (e) => {
    const {dispatch} = this.props;
    dispatch({
      type:    'grade/fetchGrade',
      payload: {...e},
    });
  };

  render() {
    const {grade, loading} = this.props;
    const {gradeSource} = grade;
    const {GradeCol} = ColData;
    const yearOptions = yearList.map((year) => (
      <Select.Option value={year} key={year}>
        {year}
      </Select.Option>
    ));
    return (
      <>
        <Card style={{marginTop: 20}} bordered={false} hoverable>
          <Form
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            layout="horizontal"
            onFinish={this.handleSubmit}
            onValuesChange={this.handleValueUpdate}
            initialValues={this.state}
          >
            <div className={styles.FormLine}>
              <Form.Item label="学年" name="year">
                <Select>
                  <Select.Option key="" value="">
                    {' '}
                  </Select.Option>
                  {yearOptions}
                </Select>
              </Form.Item>
              <Form.Item label="学期" name="semester">
                <Select>
                  <Select.Option key="" value="">
                    {' '}
                  </Select.Option>
                  <Select.Option key={1} value={1}>
                    1
                  </Select.Option>
                  <Select.Option key={2} value={2}>
                    2
                  </Select.Option>
                  <Select.Option key={3} value={3}>
                    3
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="课程性质" name="courseNature">
                <Select>
                  <Select.Option value=""> </Select.Option>
                  <Select.Option value="01">公共必修课</Select.Option>
                  <Select.Option value="02">专业必修课</Select.Option>
                  <Select.Option value="03">公共选修</Select.Option>
                  <Select.Option value="04">限选课</Select.Option>
                  <Select.Option value="05">实践课</Select.Option>
                  <Select.Option value="06">必修课</Select.Option>
                  <Select.Option value="07">省考</Select.Option>
                  <Select.Option value="08">统考</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="查询对象" name="btn">
                <Select>
                  <Select.Option value=""> </Select.Option>
                  <Select.Option value="Button2">未通过成绩</Select.Option>
                  <Select.Option value="btn_xq">学期成绩</Select.Option>
                  <Select.Option value="btn_xn">学年成绩</Select.Option>
                  <Select.Option value="btn_zcj">历年成绩</Select.Option>
                  <Select.Option value="btn_zg">课程最高成绩</Select.Option>
                </Select>
              </Form.Item>
            </div>
          </Form>
        </Card>
        <Card style={{marginTop:20}} bordered={false} hoverable>
          <h3>成绩展示</h3>
          <Table
            loading={loading}
            dataSource={gradeSource}
            columns={GradeCol}
            style={{marginTop: 50}}
          />
        </Card>
      </>
    );
  }
}

export default Query;
