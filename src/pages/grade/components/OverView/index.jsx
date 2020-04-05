import React from 'react';
import {Card, Descriptions, Statistic} from 'antd';
import DescriptionsItem from 'antd/lib/descriptions/Item';
import {gradeUtil} from '@/pages/grade/utils/utils';

function OverView(props) {
  const {creditStatistics, averageScorePoint, totalPeople, sumOfGradePoints} = props;
  const creditStatisticsArray = gradeUtil.getDoubleNumOfString(
    creditStatistics);
  return (
    <Card title="概况" loading={props.Loading} style={{marginTop: 20}} hoverable>
      <Descriptions column={{xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 2}}>
        <DescriptionsItem>
          <Statistic
            title="平均学分绩点"
            value={gradeUtil.getGradeScorePoint(averageScorePoint)}
          />
        </DescriptionsItem>
        <DescriptionsItem>
          <Statistic title="本专业人数"
                     value={gradeUtil.getNumberOfString(totalPeople)}/>
        </DescriptionsItem>
        <DescriptionsItem>
          <Statistic
            title="学分绩点总和"
            value={gradeUtil.getGradeScorePoint(sumOfGradePoints)}
          />
        </DescriptionsItem>
      </Descriptions>
      <Descriptions column={{xxl: 4, xl: 4, lg: 4, md: 2, sm: 2, xs: 2}}>
        <DescriptionsItem>
          <Statistic title="所选学分" value={creditStatisticsArray[0]}/>
        </DescriptionsItem>
        <DescriptionsItem>
          <Statistic title="获得学分" value={creditStatisticsArray[1]}/>
        </DescriptionsItem>
        <DescriptionsItem>
          <Statistic title="重修学分" value={creditStatisticsArray[2]}/>
        </DescriptionsItem>
        <DescriptionsItem>
          <Statistic title="正考未通过学分" value={creditStatisticsArray[3]}/>
        </DescriptionsItem>
      </Descriptions>
    </Card>
  );
}

export default OverView;
