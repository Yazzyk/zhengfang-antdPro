import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography, Alert } from 'antd';
import styles from './index.less';
import { Valine, ValinePanel, ValineCount } from 'react-valine';
import { connect } from 'umi';

@connect(({ user, loading }) => ({
  user,
  loading: loading.models.grade,
}))
class UpdateLog extends Component {
  render() {
    const { user } = this.props;
    return (
      <PageHeaderWrapper>
        <Card className={styles.log}>
          <Alert
            message="当前版本: 1.0.1, 本站最后更新时间: 2021.03.07"
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
                <li>
                  将除了验证码图片外的接口token全部改为从header传输,并在前端将token封装进header
                </li>
                <li>
                  后端添加了字典接口，方便获取后端的枚举类(这段代码我还没看懂)，前端成绩查询成绩页面的未通过成绩等可以直接用后端枚举
                </li>
              </ol>
            </Typography.Paragraph>
          </Typography>
          <Typography>
            <Typography.Title level={2}>更新日志 2021.03.07</Typography.Title>
            <Typography.Paragraph>
              <ol>
                <li>
                  修复 教务系统更新后需要重置密码，导致本站登录后无反应
                </li>
                <li>修复 由于教务系统去掉了选修分数的表格导致的页面无限loading，因此去掉了选修相关的数据</li>
              </ol>
            </Typography.Paragraph>
          </Typography>
        </Card>
        {/* <Card className={styles.valine}>
          <Valine
            appId="UzW1Ujw91OD5BqIiSpuc0WF8-gzGzoHsz"
            appKey="ziKCb6g6YD269VFKktW1wAg7"
            pagesize={10}
            customTxt={{
              tips: { sofa: '抢个沙发吧~' },
              ctrl: { more: '再给我来一打' },
            }}
          >
            <ValinePanel
              uniqStr={user.currentUser.sid + '_' + user.currentUser.name}
            />
          </Valine>
        </Card> */}
      </PageHeaderWrapper>
    );
  }
}

export default UpdateLog;
