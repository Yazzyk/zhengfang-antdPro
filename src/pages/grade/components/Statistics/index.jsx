import React from 'react';
import { Card, Descriptions, Statistic, Table } from 'antd';
import DescriptionsItem from 'antd/lib/descriptions/Item';
import { ColData } from '@/pages/grade/data';
import { gradeUtil } from '../../utils/utils';

function Statistics(props) {
  const creditStatisticsArray = gradeUtil.getDoubleNumOfString(props.creditStatistics);
  const { fullViewColumns, electiveColumns, unKnowColumns } = ColData;
  return (
    <div>
      <Card title="概况" loading={props.Loading}>
        <Descriptions column={{ xxl: 5, xl: 4, lg: 3, md: 3, sm: 2, xs: 2 }}>
          <DescriptionsItem>
            <Statistic
              title="平均学分绩点"
              value={gradeUtil.getGradeScorePoint(props.averageScorePoint)}
            />
          </DescriptionsItem>
          <DescriptionsItem>
            <Statistic title="本专业人数" value={gradeUtil.getNumberOfString(props.totalPeople)} />
          </DescriptionsItem>
          <DescriptionsItem>
            <Statistic
              title="学分绩点总和"
              value={gradeUtil.getGradeScorePoint(props.sumOfGradePoints)}
            />
          </DescriptionsItem>
        </Descriptions>
        <Descriptions column={{ xxl: 5, xl: 4, lg: 3, md: 3, sm: 2, xs: 2 }}>
          <DescriptionsItem>
            <Statistic title="所选学分" value={creditStatisticsArray[0]} />
          </DescriptionsItem>
          <DescriptionsItem>
            <Statistic title="获得学分" value={creditStatisticsArray[1]} />
          </DescriptionsItem>
          <DescriptionsItem>
            <Statistic title="重修学分" value={creditStatisticsArray[2]} />
          </DescriptionsItem>
          <DescriptionsItem>
            <Statistic title="正考未通过学分" value={creditStatisticsArray[3]} />
          </DescriptionsItem>
        </Descriptions>
      </Card>
      <h2>成绩全览</h2>
      <Table
        pagination={false}
        loading={props.Loading}
        dataSource={props.statisticsDataSource}
        columns={fullViewColumns}
      />
      <h2>选修</h2>
      <Table
        pagination={false}
        loading={props.Loading}
        dataSource={props.electiveDataSource}
        columns={electiveColumns}
      />
      <h2>不知道是啥的</h2>
      <Table
        pagination={false}
        loading={props.Loading}
        dataSource={props.unKnowDataSource}
        columns={unKnowColumns}
      />
    </div>
  );
}

export default Statistics;
