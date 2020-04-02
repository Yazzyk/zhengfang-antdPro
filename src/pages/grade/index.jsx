import {
  Card,
  Descriptions,
  Statistic,
} from 'antd';
import { GridContent, PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import React, { Component } from 'react';
import { connect } from 'umi';
import Statistics from './components/Statistics';
import styles from './style.less';

const fullViewColumns = [
  {
    title: '课程性质名称',
    dataIndex: 'kechengxingzhimingcheng',
    key: 'kechengxingzhimingcheng',
  },
  {
    title: '未通过学分',
    dataIndex: 'kechengxingzhimingcheng',
    key: 'kechengxingzhimingcheng',
  },
  {
    title: '获得学分',
    dataIndex: 'huodexuefen',
    key: 'huodexuefen',
  },
  {
    title: '还需学分',
    dataIndex: 'haixuxuefen',
    key: 'haixuxuefen',
  },
  {
    title: '学分要求',
    dataIndex: 'xuefenyaoqiu',
    key: 'xuefenyaoqiu',
  },
];

@connect(({ grade, user, loading }) => ({
  grade,
  user,
  loading: loading.models.grade,
}))
class Grade extends Component {
  state = {
    operationKey: 'tab1',
    tabActiveKey: 'detail',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'grade/failGrade',
    });
    dispatch({
      type: 'grade/fetchGrade',
      payload: {
        btn: 'Button1'
      }
    });
  }

  extra = (failedGrade, statistics) => (
    <div className={styles.moreInfo}>
      <Statistic title="未通过学科" value={failedGrade} />
      <Statistic title="已获得选修学分" value={statistics === undefined ? 0 : statistics.data6[0].huodexuefen} />
    </div>
  );

  onOperationTabChange = (key) => {
    this.setState({ operationKey: key });
  };

  onTabChange = (tabActiveKey) => {
    this.setState({ tabActiveKey });
  };

  description = (currentUser) => (
    <RouteContext.Consumer>
      {({ isMobile }) => (
        <Descriptions className={styles.headerList} size="small" column={isMobile ? 1 : 2}>
          <Descriptions.Item label="姓名">{currentUser.name}</Descriptions.Item>
          <Descriptions.Item label="学号">{currentUser.student_id}</Descriptions.Item>
          <Descriptions.Item label="院系">{currentUser.faculty}</Descriptions.Item>
          <Descriptions.Item label="行政班级">{currentUser.asClass}</Descriptions.Item>
        </Descriptions>
      )}
    </RouteContext.Consumer>
  );

  render() {
    const { operationKey, tabActiveKey } = this.state;
    const { grade, user, loading, failedGrade } = this.props;
    const { currentUser } = user;
    const { statistics } = grade;
    const contentList = {
      tab1: (
        <Statistics
          Loading={loading}
          DataSource={statistics === undefined ? [] : statistics.data2}
          Col = {fullViewColumns}
          averageScorePoint = {statistics.averageScorePoint}
        />
      ),
    };
    return (
      <PageHeaderWrapper
        title='学生信息'
        className={styles.pageHeader}
        content={this.description(currentUser)}
        extraContent={this.extra(failedGrade, statistics)}
        tabActiveKey={tabActiveKey}
        onTabChange={this.onTabChange}
        tabList={[
          {
            key: 'detail',
            tab: '成绩统计',
          },
          {
            key: 'rule',
            tab: '成绩查询',
          },
        ]}
      >
        <div className={styles.main}>
          <GridContent>
            <Card
              className={styles.tabsCard}
              bordered={false}
              onTabChange={this.onOperationTabChange}
            >
              {contentList[operationKey]}
            </Card>
          </GridContent>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Grade;
