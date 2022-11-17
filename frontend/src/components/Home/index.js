import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

const Home = () => {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 6000,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    useTransform: true,
  };
  return (
    <>
      <div>
        <div className="slider">
          <h2 className="slider_text"></h2>
          <Slider {...settings}>
            <div>
              <h3>
                <img
                  onLoad={() => window.dispatchEvent(new Event("resize"))}
                  className="image_slider"
                  src={
                    "https://previews.123rf.com/images/taden/taden1209/taden120900355/15364594-martillo-casco-y-guantes-en-el-fondo-de-madera-.jpg"
                  }
                  alt="product"
                />
              </h3>
            </div>
            <div>
              <h3>
                <img
                  onLoad={() => window.dispatchEvent(new Event("resize"))}
                  className="image_slider"
                  src={
                    "https://previews.123rf.com/images/donatas1205/donatas12051112/donatas1205111200011/11764759-rollos-de-papel-y-caja-de-herramientas-.jpg"
                  }
                  alt="product"
                />
              </h3>
            </div>
            <div>
              <h3>
                <img
                  onLoad={() => window.dispatchEvent(new Event("resize"))}
                  className="image_slider"
                  src={
                    "https://previews.123rf.com/images/yotrak/yotrak1204/yotrak120400037/13013542-carpintero.jpg"
                  }
                  alt="product"
                />
              </h3>
            </div>
            <div>
              <h3>
                <img
                  onLoad={() => window.dispatchEvent(new Event("resize"))}
                  className="image_slider"
                  src={
                    "https://previews.123rf.com/images/banky405/banky4051701/banky405170100034/70730002-diferentes-herramientas.jpg"
                  }
                  alt="product"
                />
              </h3>
            </div>
            <div>
              <h3>
                <img
                  onLoad={() => window.dispatchEvent(new Event("resize"))}
                  className="image_slider"
                  src={
                    "https://previews.123rf.com/images/musicphone1/musicphone11506/musicphone1150600265/41688867-diferentes-herramientas-en-un-fondo-de-madera-.jpg"
                  }
                  alt="product"
                />
              </h3>
            </div>
            <div>
              <h3>
                <img
                  onLoad={() => window.dispatchEvent(new Event("resize"))}
                  className="image_slider"
                  src={
                    "https://previews.123rf.com/images/noegrr/noegrr1501/noegrr150100054/35839396-diferentes-herramientas-en-un-peque%C3%B1o-tambor-de-zinc.jpg"
                  }
                  alt="product"
                />
              </h3>
            </div>
            <div>
              <h3>
                <img
                  onLoad={() => window.dispatchEvent(new Event("resize"))}
                  className="image_slider"
                  src={
                    "https://previews.123rf.com/images/ekpaul/ekpaul1503/ekpaul150300047/38641128-conjunto-de-diferentes-herramientas-en-un-fondo-de-madera.jpg"
                  }
                  alt="product"
                />
              </h3>
            </div>
            <div>
              <h3>
                <img
                  onLoad={() => window.dispatchEvent(new Event("resize"))}
                  className="image_slider"
                  src={
                    "https://previews.123rf.com/images/pupkis/pupkis1206/pupkis120600037/14036291-martillo-que-golpea-las-u%C3%B1as-sobre-fondo-de-madera-.jpg"
                  }
                  alt="product"
                />
              </h3>
            </div>
            <div>
              <h3>
                <img
                  onLoad={() => window.dispatchEvent(new Event("resize"))}
                  className="image_slider"
                  src={
                    "https://previews.123rf.com/images/taden/taden1210/taden121000153/15669023-diferentes-herramientas-y-guantes-en-el-fondo-de-madera-.jpg"
                  }
                  alt="product"
                />
              </h3>
            </div>
          </Slider>
        </div>
        <div className="container">
          <div
            className="sub-container"
            onClick={() => {
              navigate("/services");
            }}
          >
            <img
              className="product-image-home"
              src={
                "https://previews.123rf.com/images/pupkis/pupkis1206/pupkis120600038/14036283-reglas-sobre-un-fondo-de-madera-.jpg"
              }
              alt="product"
            />
            <h1 className="header_Product_text">Services</h1>
          </div>

          <div
            className="sub-container"
            onClick={() => {
              navigate("/products");
            }}
          >
            <img
              className="product-image-home"
              src={
                "https://previews.123rf.com/images/donatas1205/donatas12051404/donatas1205140400005/27508619-varios-carpinter%C3%ADa-herramientas-de-construcci%C3%B3n-que-cuelgan-sobre-el-tablero-.jpg"
              }
              alt="product"
            />
            <h1 className="header_Product_text">Products</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
