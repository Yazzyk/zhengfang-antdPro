import { Descriptions, Statistic, Alert, Button, Modal } from 'antd';
import { GridContent, PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import React, { Component } from 'react';
import { connect } from 'umi';
import Query from '@/pages/grade/components/Query';
import Statistics from './components/Statistics';
import styles from './style.less';

@connect(({ grade, global, user, loading }) => ({
  grade,
  user,
  global,
  loading: loading.models.grade,
}))
class Grade extends Component {
  state = {
    operationKey: 'statistics',
    tabActiveKey: 'statistics',
    isModalVisible: true,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'grade/failGrade',
    });
    dispatch({
      type: 'grade/fetchGrade',
      payload: {
        btn: 'Button1',
      },
    });
    dispatch({
      type: 'global/getDictionaries',
    });
    console.log(this.props);
  }

  extra = (failedGrade, statistics) => {
    return (
      <div className={styles.moreInfo}>
        <Statistic title="未通过学科" value={failedGrade === undefined ? 0 : failedGrade.length} />
        {/* <Statistic
          title="已获得选修学分"
          value={statistics === undefined ? 0 : statistics.data6[0].huodexuefen}
          suffix="/6"
        /> */}
      </div>
    );
  };

  onTabChange = (tabActiveKey) => {
    this.setState({ tabActiveKey });
    this.setState({ operationKey: tabActiveKey });
  };

  helpRequestHandleOk = () => {
    this.setState({isModalVisible: false})
  }

  helpRequestHandleCancel = () => {
    this.setState({isModalVisible: false})
  }

  description = (currentUser) => (
    <RouteContext.Consumer>
      {({ isMobile }) => (
        <Descriptions className={styles.headerList} size="small" column={isMobile ? 1 : 2}>
          <Descriptions.Item label="姓名">{currentUser.name}</Descriptions.Item>
          <Descriptions.Item label="学号">{currentUser.sid}</Descriptions.Item>
          <Descriptions.Item label="院系">{currentUser.faculty}</Descriptions.Item>
          <Descriptions.Item label="行政班级">{currentUser.asClass}</Descriptions.Item>
        </Descriptions>
      )}
    </RouteContext.Consumer>
  );

  render() {
    const { operationKey, tabActiveKey } = this.state;
    const { grade, user, loading } = this.props;
    const { currentUser } = user;
    const { statistics, failedGrade } = grade;

    const contentList = {
      statistics: (
        <Statistics
          Loading={loading}
          averageScorePoint={statistics === undefined ? '0' : statistics.averageScorePoint}
          sumOfGradePoints={statistics === undefined ? '0' : statistics.sumOfGradePoints}
          totalPeople={statistics === undefined ? '0' : statistics.totalPeople}
          creditStatistics={statistics === undefined ? '0,0,0,0' : statistics.creditStatistics}
          statisticsDataSource={statistics === undefined ? [] : statistics.data2}
          electiveDataSource={
            statistics === undefined ? [{ key: 0, huodexuefen: 0 }] : statistics.data6
          }
          unKnowDataSource={statistics === undefined ? [] : statistics.data7}
        />
      ),
      query: (
        <Query
          Loading={loading}
          gradeSource={grade.gradeSource === undefined ? {} : grade.gradeSource}
        />
      ),
    };
    return (
      <PageHeaderWrapper
        title="学生信息"
        className={styles.pageHeader}
        content={this.description(currentUser)}
        extraContent={this.extra(failedGrade, statistics)}
        tabActiveKey={tabActiveKey}
        onTabChange={this.onTabChange}
        tabList={[
          {
            key: 'statistics',
            tab: '成绩统计',
          },
          {
            key: 'query',
            tab: '成绩查询',
          },
        ]}
      >
        <div className={styles.main}>
          <GridContent>
            <div className={styles.tabsCard}>{contentList[operationKey]}</div>
          </GridContent>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Grade;
