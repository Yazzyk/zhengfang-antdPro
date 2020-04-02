import React, { Component } from 'react';
import { Table, Card, Descriptions, Statistic } from 'antd';
import DescriptionsItem from 'antd/lib/descriptions/Item';
import { gradeUtil } from '../../utils/utils';

class Statistics extends Component {

  handleGradePointAverage = (text) => {
    return gradeUtil.getGradePointAverage(text);
  }

  render() {
    this.handleGradePointAverage(this.props.averageScorePoint)
    return (
      <div>
        <Card
          title="概况"
          loading={this.props.Loading}
        >
          <Descriptions>
            <DescriptionsItem><Statistic title="平均学分绩点" value={this.handleGradePointAverage(this.props.averageScorePoint)} /></DescriptionsItem>
            <DescriptionsItem>{this.props.totalPeople}</DescriptionsItem>
            <DescriptionsItem>{this.props.sumOfGradePoints}</DescriptionsItem>
          </Descriptions>
        </Card>
        <h2>成绩全览</h2>
        <Table
          pagination={false}
          loading={this.props.Loading}
          dataSource={this.props.DataSource}
          columns={this.props.Col}
        />
      </div>
    )
  }
}

export default Statistics;