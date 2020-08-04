import React, { useState } from "react";
import "antd/dist/antd.css";
import Icon from "@ant-design/icons";
import { Card, Input, Button, Spin, message } from "antd";
import "../static/css/login.css";
import servicePath from "../config/apiUrl";
import axios from "axios";


const Login = (props) => {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const checkLogin = () => {
    setIsLoading(true);
    if (!userName) {
      message.error("用户名不能为空");
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return false;
    } else if (!password) {
      message.error("密码不能为空");
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return false;
    }
    let dataProps = {
      userName: userName,
      password: password,
    };
    axios({
      method: "post",
      url: servicePath.checkLogin,
      data: dataProps,
      withCredentials: true, //共享session
      header: { "Access-Control-Allow-Origin": "*" },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.data.data === "登陆成功") {
          localStorage.setItem("openId", res.data.openId);
          props.history.push("/index/");
        } else {
          message.error("用户名密码错误");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  return (
    <div className="login-div">
      <Spin
        tip="亲~检测到您的网络有点慢,服务器大大正在加紧为您展示中呢~"
        spinning={isLoading}
      >
        <Card title="Abell Blog System" bordered={true} style={{ width: 400 }}>
          <Input
            id="userName"
            size="large"
            placeholder="亲,请输入您的用户名哦~"
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            onChange={(e) => {
              setuserName(e.target.value);
            }}
          />
          <Input.Password
            id="password"
            size="large"
            placeholder="亲,请输入您的密码哦~"
            prefix={<Icon type="key" style={{ color: "rgba(0,0,0,.25)" }} />}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button type="primary" size="large" block onClick={checkLogin}>
            登录
          </Button>
        </Card>
      </Spin>
    </div>
  );
};
Login.getInitialProps = async () => {};

export default Login;
