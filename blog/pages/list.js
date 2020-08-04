import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Row, Col, List, Icon, Breadcrumb, Pagination } from "antd";
import Header from "../components/Header";
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import axios from "axios";
import servicePath from "../config/apiUrl";
import Link from "next/link";

import marked from "marked";
import highlight from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

const MyList = (props) => {
  const [myList, setMyList] = useState(props.data);
  useEffect(() => {
    setMyList(props.data);
  });
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    highlight: function (code) {
      return highlight.highlightAuto(code);
    },
  });
  return (
    <div>
      <Head>
        <title>Abell个人博客</title>
      </Head>
      <Header></Header>
      <Row className="common-main" type="flex" justify="center">
        <Col className="common-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="/">首页</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>文章</Breadcrumb.Item>
            </Breadcrumb>
          </div>
            <List
              header={<div>最新日志</div>}
              itemLayout="vertical"
              dataSource={myList}
              renderItem={(item) => {
                return (
                  <List.Item>
                    <div className="list-title">
                      <Link
                        href={{
                          pathname: "/detail",
                          query: {
                            id: item.id,
                          },
                        }}
                      >
                        <a>{item.title}</a>
                      </Link>
                    </div>
                    <div className="list-icon">
                      <span>
                        <Icon type="calender" />
                        {item.addTime}
                      </span>
                      <span>
                        <Icon type="folder" />
                        {item.typeName}
                      </span>
                      <span>
                        <Icon type="fire" />
                        {item.view_count}
                      </span>
                    </div>
                    <div
                      className="list-context"
                      dangerouslySetInnerHTML={{
                        __html: marked(item.introduce),
                      }}
                    ></div>
                  </List.Item>
                );
              }}
            />
        </Col>
        <Col className="common-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert></Advert>
        </Col>
      </Row>
      <Footer></Footer>
    </div>
  );
};

MyList.getInitialProps = async (context) => {
  const id = context.query.id;
  const promise = new Promise((resolve) => {
    axios.get(servicePath.getListById + id).then((res) => {
      resolve(res.data);
    });
  });
  return await promise;
};
export default MyList;
