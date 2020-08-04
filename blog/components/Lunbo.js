import { Carousel } from "antd";
import React from "react";
import '../public/style/components/Lunbo.css'

export default function Lunbo() {
  return (
      <Carousel autoplay effect="fade">
        <div>
            <img src='/static/1.jpeg'></img>
        </div>
        <div>
          <img src='/static/2.jpeg'></img>
        </div>
        <div>
          <img src='/static/3.jpeg'></img>
        </div>
        <div>
          <img src='/static/4.jpg'></img>
        </div>
      </Carousel>
  );
}
