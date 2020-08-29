import React, { Component } from 'react';
import { Card, Form, Select } from 'antd';
import ProTable from '@ant-design/pro-table';
import { connect } from '@/.umi/plugin-dva/exports';
import { ColData } from '../../data';
import styles from './styles.less';

const yearList = [];
const thisYear = new Date().getFullYear();
for (let i = 2001; i <= thisYear; i += 1) {
  yearList.push(`${i}-${i + 1}`);
}

@connect(({ grade, global, loading }) => ({
  grade,
  global,
  loading: loading.models.grade,
}))
class Query extends Component {
  state = {
    year: ``,
    semester: '',
    courseNature: '',
    btn: 'Button2',
    selectedRows: []
  };

  componentDidMount() {
    this.handleValueUpdate({}, this.state);
  }

  handleValueUpdate = (changeValue, allValue) => {
    this.setState(allValue);
    this.handleSubmit(allValue);
  };

  handleSubmit = (e) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'grade/fetchGrade',
      payload: { ...e },
    });
  };

  getAverage = (selectedRows, selectedRowKeys) => {
    if (selectedRowKeys.length === 0) {
      return 0;
    }
    const count = selectedRows.reduce((pre, item) => (pre - '0') + (item.chengji - '0'), 0);
    return (count / selectedRowKeys.length).toFixed(2);
  }

  render() {
    const { grade, loading, global: {dictionaries} } = this.props;
    const { gradeSource } = grade;
    const { GradeCol } = ColData;
    const yearOptions = yearList.map((year) => (
      <Select.Option value={year} key={year}>
        {year}
      </Select.Option>
    ));
    return (
      <>
        <Card style={{ marginTop: 20 }} bordered={false} hoverable>
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
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
                  <Select.Option value="Button2">{dictionaries.BtnType.Button2}</Select.Option>
                  <Select.Option value="btn_xq">{dictionaries.BtnType.btn_xq}</Select.Option>
                  <Select.Option value="btn_xn">{dictionaries.BtnType.btn_xn}</Select.Option>
                  <Select.Option value="btn_zcj">{dictionaries.BtnType.btn_zcj}</Select.Option>
                  <Select.Option value="btn_zg">{dictionaries.BtnType.btn_zg}</Select.Option>
                </Select>
              </Form.Item>
            </div>
          </Form>
        </Card>
        <Card style={{ marginTop: 20 }} bordered={false} hoverable>
          <ProTable
            loading={loading}
            dataSource={gradeSource}
            columns={GradeCol}
            headerTitle='成绩表'
            rowKey='key'
            rowSelection={{}}
            search={false}
            tableAlertRender={({selectedRowKeys, selectedRows}) => 
            (
              <div>
                已选择
                <a
                  style={{
                    fontWeight: 600,
                  }}
                >
                  {selectedRowKeys.length}
                </a>
            项&nbsp;&nbsp;
                <span>
                  分数总计 {selectedRows.reduce((pre, item) => (pre - '0') + (item.chengji - '0'), 0)}分
                  &nbsp;&nbsp;
                  平均分  {this.getAverage(selectedRows, selectedRowKeys)}分
                </span>
              </div>
            )
            }
          />
        </Card>
      </>
    );
  }
}

export default Query;
