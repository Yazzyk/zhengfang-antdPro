import { Alert, Checkbox } from 'antd';
import React, { Component, useState } from 'react';
import { Link, connect } from 'umi';
import LoginFrom from './components/Login';
import styles from './style.less';

const { Tab, UserName, Password, Submit } = LoginFrom;

@connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))
class Login extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  }

  componentWillMount(){
    const {dispatch} = this.props;
    dispatch({
      type: 'login/getToken'
    });
  };

  setAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  handleSubmit = values => {
    const type = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'login/login',
      payload: { ...values, type },
    });
  };

  LoginMessage = ({ content }) => (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );

  render() {
    const { userLogin, submitting } = this.props;
    const { status, type: loginType } = userLogin;
    const { type, autoLogin } = this.state;

    return (
      <div className={styles.main}>
        <LoginFrom activeKey={type} onSubmit={this.handleSubmit}>
          <Tab key="account" tab="账户密码登录">
            {status === 'error' && loginType === 'account' && !submitting && (
              this.LoginMessage("账户或密码错误（admin/ant.design")
            )}

            <UserName
              name="userName"
              placeholder="用户名: admin or user"
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <Password
              name="password"
              placeholder="密码: ant.design"
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
          </Tab>
          <div>
            <Checkbox checked={autoLogin} onChange={this.setAutoLogin}>
              自动登录
            </Checkbox>
          </div>
          <Submit loading={submitting}>登录</Submit>
        </LoginFrom>
      </div>
    );
  }
}

export default Login;
