import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { Row, Col, List, Icon } from "antd";
import Header from "../components/Header";
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import Lunbo from "../components/Lunbo";
import "../public/style/pages/index.css";
import servicePath from "../config/apiUrl";

import marked from "marked";
import highlight from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

const Home = (list) => {
  const [myList, setMyList] = useState(list.data);

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
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={23} lg={23} xl={18}>
          <Lunbo></Lunbo>
        </Col>
      </Row>
      <Row className="common-main" type="flex" justify="center">
        <Col className="common-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List
            header={<div>全部文章</div>}
            itemLayout="vertical"
            dataSource={myList}
            pagination={{
              pageSize: 10,
            }}
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

Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios.get(servicePath.getArticleList).then((res) => {
      resolve(res.data);
    });
  });

  return await promise;
};

export default Home;
