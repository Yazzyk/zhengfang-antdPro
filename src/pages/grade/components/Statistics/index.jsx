import React from 'react';
import {Card, Col, Row, Table} from 'antd';
import {ColData} from '@/pages/grade/data';
import {Chart, Coord, Geom, Label, Tooltip} from 'bizcharts';
import OverView from '@/pages/grade/components/OverView';

const getCreditsEarned = (dataArr) => {
  const resultArr = [];
  dataArr.forEach((item) => {
    resultArr.push(
      {name: item.kechengxingzhimingcheng, value: item.huodexuefen - '0'},
    );
  });
  return resultArr;
};

function Statistics(props) {
  const {
    averageScorePoint, sumOfGradePoints,
    creditStatistics, Loading, electiveDataSource, totalPeople, unKnowDataSource,
    statisticsDataSource,
  } = props;
  // const electiveCredits = electiveDataSource[0].huodexuefen;
  const creditsEarned = getCreditsEarned(statisticsDataSource);
  // const electiveData = [
  //   {
  //     name:  `已获得学分`,
  //     value: electiveCredits - '0',
  //   },
  //   {
  //     name:  `还需学分`,
  //     value: 6 - (electiveCredits - '0'),
  //   },
  // ];
  const {fullViewColumns, electiveColumns, unKnowColumns} = ColData;
  return (
    <>
      <Row gutter={{xs: 8, sm: 16, md: 24}} justify='space-around'>
        {/* <Col flex='1 0 50%'>
          <Card
            loading={Loading}
            bordered={false}
            hoverable
            style={{marginTop: 20}}
          >
            <Chart
              forceFit
              height={300}
              data={electiveData}
            >
              <h3>选修</h3>
              <Coord type='theta'/>
              <Tooltip showTitle title/>
              <Geom
                type="intervalStack"
                position="value"
                color="name"
              >
                <Label content="name"/>
              </Geom>
            </Chart>
          </Card>
        </Col> */}
        <Col flex='1 0 50%'>
          <Card
            loading={Loading}
            bordered={false}
            hoverable
            style={{marginTop:20}}
          >
            <Chart
              forceFit
              height={300}
              data={creditsEarned}
            >
              <h3>已获得学分来源</h3>
              <Coord type='theta'/>
              <Tooltip showTitle title/>
              <Geom
                type="intervalStack"
                position="value"
                color="name"
              >
                <Label content='name'/>
              </Geom>
            </Chart>
          </Card>
        </Col>
      </Row>
      <OverView
        Loading={Loading}
        averageScorePoint={averageScorePoint}
        sumOfGradePoints={sumOfGradePoints}
        totalPeople={totalPeople}
        creditStatistics={creditStatistics}
      />
      <Card hoverable bordered={false} style={{marginTop: 20}}>
        <h2>成绩全览</h2>
        <Table
          pagination={false}
          loading={Loading}
          dataSource={statisticsDataSource}
          columns={fullViewColumns}
        />
      </Card>
      {/* <Card hoverable bordered={false} style={{marginTop: 20}}>
        <h2>选修</h2>
        <Table
          pagination={false}
          loading={Loading}
          dataSource={electiveDataSource}
          columns={electiveColumns}
        />
      </Card> */}
      <Card hoverable bordered={false} style={{marginTop: 20}}>
        <h2>不知道是啥的</h2>
        <Table
          pagination={false}
          loading={Loading}
          dataSource={unKnowDataSource}
          columns={unKnowColumns}
        />
      </Card>
    </>
  );
}

export default Statistics;
