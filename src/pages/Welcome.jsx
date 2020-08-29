import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography, Alert } from 'antd';
import styles from './Welcome.less';

export default () => (
  <PageHeaderWrapper>
    <Card className={styles.welcome}>
      <Alert
        message="欢迎使用!如有发现bug或有疑问,建议,或者意见,可联系我(QQ:917885215)"
        type="success"
        showIcon
        banner
        style={{
          margin: -12,
          marginBottom: 24,
        }}
      />
      <Typography>
        <Typography.Title level={2}>维护与更新</Typography.Title>
        <Typography.Paragraph>
          由于本人已经从Java转去做Golang的开发,后面的维护可能会越来越少
        </Typography.Paragraph>
      </Typography>
      <Typography>
        <Typography.Title level={2}>通过反向代理访问学校官方的教务系统</Typography.Title>
        <Typography.Paragraph>
          受<a href="https://blackyau.cc/" rel="noopener noreferrer" target="_blank">某位同学</a>启发,
          使用Nginx的方向代理，可以从我的域名访问到学校的正方系统：<a href="http://zf.css0209.cn"  rel="noopener noreferrer" target="_blank">官方正方系统地址</a>,<br />
          由于神秘的力量，不能做SSL，否则会有bug。<br />
          反向代理技术请参考：<a href="https://baike.baidu.com/item/%E5%8F%8D%E5%90%91%E4%BB%A3%E7%90%86"  rel="noopener noreferrer" target="_blank">反向代理</a>
        </Typography.Paragraph>
      </Typography>
      <Typography>
        <Typography.Title level={2}>为什么学校的正方系统只能用IE访问?</Typography.Title>
        <Typography.Paragraph>
          原因是学校的正方系统是直接挂在服务器的95端口下的,服务器似乎是IIS(不懂请百度),
          也没法做反向代理,95端口是非安全端口,在主流浏览器(IE、Firefox、Google
          Chrome、Safari、Opera)
          里(你们用的什么360浏览器,QQ浏览器等,其内核都是上面一些浏览器的内核),
          除IE以外都是默认限制非安全端口的,所以只有IE能访问学校的正方系统。
        </Typography.Paragraph>
        <Typography.Title level={2}>能不能让主流浏览器也访问到学校的正方系统?</Typography.Title>
        <Typography.Paragraph>
          当然是可以的,这里建议用FireFox浏览器,比较好修改。 详情请参考:
          <a href="https://css0209.cn/251.html" rel="noopener noreferrer" target="_blank">
            Chrome/Firefox非安全端口问题
          </a>
          至于其它的浏览器,我还没有试过,也不知道怎么玩。
        </Typography.Paragraph>
      </Typography>
      <Typography.Title level={2}>原理</Typography.Title>
      <Typography.Paragraph>
        使用Jsoup爬取学校正方系统,获取学校的登录页验证码图片，和token,然后返回给我的前端,用户输入账号密码和验证码,返回给我的服务器端,
        我的服务器端在将用户提交的账号密码和验证码发送到学校的服务器,并登陆进入查询页面,同时获取登陆用户的一些个人信息,
        查询成绩功能在学校的正方系统上是通过提交表单实现的，所以我也同理使用了提交表单。
        简单来说就是我这里只是作为一个中间人,我不知道也不会知道你的密码,你需要查什么,先告诉我,然后我会去查,再将结果告诉你。
      </Typography.Paragraph>
    </Card>
  </PageHeaderWrapper>
);
