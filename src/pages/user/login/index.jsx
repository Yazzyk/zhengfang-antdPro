import { Alert, Checkbox, Input, Tooltip } from 'antd';
import React, { Component } from 'react';
import { connect } from 'umi';
import LoginFrom from './components/Login';
import styles from './style.less';

const { Tab, UserName, Password, Submit, CaptCha } = LoginFrom;

@connect(({ login, global, loading }) => ({
  global,
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
      type: 'global/getToken',
    });
  }

  handleChangeCaptChaSrc = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeCaptChaSrc',
    });
  };

  setAutoLogin = (e) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  handleSubmit = (values) => {
    const type = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'login/login',
      payload: { ...values, type },
    });
  };

  LoginMessage = (content) => (
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
    const { global, userLogin, submitting } = this.props;
    const { status, type: loginType, message } = userLogin;
    const { captChaSrc } = global;
    const { type, autoLogin } = this.state;

    return (
      <div className={styles.main}>
        <LoginFrom activeKey={type} onSubmit={this.handleSubmit}>
          <Tab key="account" tab="账户密码登录">
            {status === 'fail' &&
              loginType === 'fail' &&
              !submitting &&
              this.LoginMessage(message || '奇怪的bug增加了,请联系作者QQ:917885215')}

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
              <Tooltip title="点击切换验证码" placement="left">
                <img
                  className={styles.captcha}
                  onClick={this.handleChangeCaptChaSrc}
                  src={captChaSrc}
                  alt="验证码"
                />
              </Tooltip>
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
