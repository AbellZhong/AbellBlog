import React from "react";
import { Avatar, Divider } from "antd";
import '../public/style/components/Author.css'

export default function Author() {
  return (
    <div className="author-div common-box">
      <div>
        <Avatar size={100} src='/static/avatar1.jpeg' />
      </div>
      <div className="author-introduction">
        沫夏沫茶绿 
        <Divider>社交账号</Divider>
        <Avatar size={28} icon="github" className="account" />
        <Avatar size={28} icon="qq" className="account"/>
        <Avatar size={28} icon="wechat" className="account"/>
      </div>
    </div>
  );
}
