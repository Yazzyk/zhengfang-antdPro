import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography, Alert } from 'antd';
import styles from './index.less';
import { Valine, ValinePanel, ValineCount } from 'react-valine';

@connect(({grade, global, user, loading}) => ({
  user,
  global,
  loading: loading.models.grade,
}))
export default () => (
  <PageHeaderWrapper>
    <Card className={styles.log}>
      <Alert
        message="当前版本: 1.0, 本站最后更新时间: 2020.08.30"
        type="success"
        showIcon
        banner
        style={{
          margin: -12,
          marginBottom: 24,
        }}
      />
      <Typography>
        <Typography.Title level={2}>更新日志 2020.08.30</Typography.Title>
        <Typography.Paragraph>
          由于本人已经从Java转去做Golang的开发,后面的维护可能会越来越少
          <br />
          本次更新主要修改后端
          <ol>
            <li>已经将后端的接口全部修改，与webflux的风格统一</li>
            <li>将除了验证码图片外的接口token全部改为从header传输,并在前端将token封装进header</li>
            <li>
              后端添加了字典接口，方便获取后端的枚举类(这段代码我还没看懂)，前端成绩查询成绩页面的未通过成绩等可以直接用后端枚举
            </li>
            <li>添加评论功能, 请理性发言!!</li>
          </ol>
        </Typography.Paragraph>
      </Typography>
    </Card>
    <Card className={styles.valine}>
      <Valine
        appId="UzW1Ujw91OD5BqIiSpuc0WF8-gzGzoHsz"
        appKey="ziKCb6g6YD269VFKktW1wAg7"
        pagesize={10}
        customTxt={{
          tips: { sofa: '抢个沙发吧~' },
          ctrl: { more: '再给我来一打' },
        }}
      >
        <div>评论数：<ValineCount /></div>
        <ValinePanel uniqStr={this.props.user.currentUser.username+'_'+this.props.user.currentUser.name} />
      </Valine>
    </Card>
  </PageHeaderWrapper>
);
