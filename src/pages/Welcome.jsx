import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Typography, Alert } from 'antd';

export default () => (
  <PageHeaderWrapper>
    <Card>
      <Alert
        message="欢迎使用!"
        type="success"
        showIcon
        banner
        style={{
          margin: -12,
          marginBottom: 24,
        }}
      />
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
      <Typography.Title level={2}>做这个查询系统的原因和过程(来听我吹牛~)</Typography.Title>
      <Typography.Paragraph>
        首先,我也是航院的学生,我是17级计应专业的,也是第一任计算机科技协会竞赛部的副部长,
        目前已经在工作了。
      </Typography.Paragraph>
      <Typography.Paragraph>
        起初其实并不是想做查成绩这个功能的, 只是看到一个{' '}
        <a target="_blank" rel="noopener noreferrer" href="https://haowei.ch/">
          朋友
        </a>
        ,也是我们学校的,
        他做了一个Python爬虫,可以爬取正方系统,然后获取课表(当时课表是可查的),并自动导入到他的苹果电脑的日历里,
        看着好玩,我就想做一个爬虫把课表爬下来,然后自己写一个简单的课表APP(没有广告),或者导入到超级课程表之类的APP里,
        结果爬虫还没写出来,查课功能就关闭了...
        <br />
        没过多久就期末了,考完试总有人来问我为什么学校的网站进不去,
        尽管我写过博客来介绍用手机也能访问的方法,但每次考完试查成绩,总是不停的有人问我,要不然就是让我帮忙查成绩,
        甚至连问我他自己登录密码是多少的都有...
        <br />
      </Typography.Paragraph>
      <Typography.Paragraph>
        得~知识改变命运,好人做到底。我干脆再写一个网站,以后端用<code>Java</code>
        ,再用一堆框架、工具(SpringBoot,Hutool,Jsoup), 前端用React,Redux,And Design,
        最后终于勉勉强强在大二暑假做出来了(当时已经在实习了),但似乎有bug,
        在实习后,又加上新技术Webflux,Redis,终于,大三开学的时候可以正常访问了!
      </Typography.Paragraph>
      <Typography.Paragraph>
        而当你看到这个页面时,它的前端已经被我用企业级框架<code>umi+Ant Design Pro+dva</code>
        重新做了一次!
      </Typography.Paragraph>
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
