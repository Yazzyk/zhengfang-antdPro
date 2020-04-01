import { Alert, Checkbox, Input } from 'antd';
import React, { Component } from 'react';
import { connect } from 'umi';
import LoginFrom from './components/Login';
import styles from './style.less';

const { Tab, UserName, Password, Submit, CaptCha } = LoginFrom;

@connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))
class Login extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };

  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    dispatch({
      type: 'login/getToken',
    });
  }

  setAutoLogin = (e) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  handleSubmit = (values) => {
    const type = this.state;
    const { dispatch } = this.props;
    console.log('====================================');
    console.log(values);
    console.log('====================================');
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
    const { status, type: loginType, message, captChaSrc } = userLogin;
    const { type, autoLogin } = this.state;

    return (
      <div className={styles.main}>
        <LoginFrom activeKey={type} onSubmit={this.handleSubmit}>
          <Tab key="account" tab="账户密码登录">
            {status === 'error' &&
              loginType === 'account' &&
              !submitting &&
              this.LoginMessage(message || '账户或密码错误')}

            <UserName
              name="username"
              placeholder="学号"
              rules={[
                {
                  required: true,
                  message: '请输入学号!',
                },
              ]}
            />
            <Password
              name="password"
              placeholder="密码"
              autoComplete="false"
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
            <Input.Group>
              <img className={styles.captcha} src={captChaSrc} alt="验证码" />
              <CaptCha
                name="captcha"
                placeholder="验证码"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码！',
                  },
                ]}
              />
            </Input.Group>
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
