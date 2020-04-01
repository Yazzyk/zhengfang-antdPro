import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, useIntl, connect } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import React from 'react';
import SelectLang from '@/components/SelectLang';
import logo from '../assets/logo.svg';
import styles from './UserLayout.less';

const UserLayout = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const {} = useIntl();
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    breadcrumb,
    ...props,
  });
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
          {/* <SelectLang /> */}
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>成绩查询系统</span>
              </Link>
            </div>
            <div className={styles.desc}>川航院第三方成绩查询系统</div>
          </div>
          {children}
        </div>
        <DefaultFooter
          copyright="2020 Coded By PaleBlueYk"
          links={[
            {
              key: 'Ant Design Pro',
              title: 'Ant Design Pro',
              href: 'https://pro.ant.design',
              blankTarget: true,
            },
            {
              key: 'github',
              title: <GithubOutlined />,
              href: 'https://github.com/paleblueyk/zhengfang-web-react',
              blankTarget: true,
            },
            {
              key: 'PaleBlueYk',
              title: 'PaleBlueYk',
              href: 'https://css0209.cn',
              blankTarget: true,
            },
          ]}
        />
      </div>
    </HelmetProvider>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
