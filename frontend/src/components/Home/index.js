import React from 'react';
import "./style.css";
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";

const Home = () => {
    const navigate = useNavigate();
    const settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 3,
      slidesToScroll: 3,
      autoplay: true,
      autoplaySpeed: 2000,
      useTransform : true
    };
  return (
    <>
    <div>
    <div className='slider'>
        <h2> Multiple items </h2>
        <Slider {...settings}>
          <div>
            <h3>
            <img
                      className="slider-image-home"
                      src={'https://previews.123rf.com/images/kitch/kitch1503/kitch150300123/37641378-un-plano-corto-de-art%C3%ADculos-del-taller.jpg'}
                      alt="product"
                    />
              </h3>
          </div>
          <div>
            <h3><img
                      className="slider-image-home"
                      src={'https://previews.123rf.com/images/kitch/kitch1503/kitch150300123/37641378-un-plano-corto-de-art%C3%ADculos-del-taller.jpg'}
                      alt="product"
                    /></h3>
          </div>
          <div>
            <h3><img
                      className="slider-image-home"
                      src={'https://previews.123rf.com/images/kitch/kitch1503/kitch150300123/37641378-un-plano-corto-de-art%C3%ADculos-del-taller.jpg'}
                      alt="product"
                    /></h3>
          </div>
          <div>
            <h3><img
                      className="slider-image-home"
                      src={'https://previews.123rf.com/images/kitch/kitch1503/kitch150300123/37641378-un-plano-corto-de-art%C3%ADculos-del-taller.jpg'}
                      alt="product"
                    /></h3>
          </div>
          <div>
            <h3><img
                      className="slider-image-home"
                      src={'https://previews.123rf.com/images/kitch/kitch1503/kitch150300123/37641378-un-plano-corto-de-art%C3%ADculos-del-taller.jpg'}
                      alt="product"
                    /></h3>
          </div>
          <div>
            <h3><img
                      className="slider-image-home"
                      src={'https://previews.123rf.com/images/kitch/kitch1503/kitch150300123/37641378-un-plano-corto-de-art%C3%ADculos-del-taller.jpg'}
                      alt="product"
                    /></h3>
          </div>
          <div>
            <h3><img
                      className="slider-image-home"
                      src={'https://previews.123rf.com/images/kitch/kitch1503/kitch150300123/37641378-un-plano-corto-de-art%C3%ADculos-del-taller.jpg'}
                      alt="product"
                    /></h3>
          </div>
          <div>
            <h3><img
                      className="slider-image-home"
                      src={'https://previews.123rf.com/images/kitch/kitch1503/kitch150300123/37641378-un-plano-corto-de-art%C3%ADculos-del-taller.jpg'}
                      alt="product"
                    /></h3>
          </div>
          <div>
            <h3><img
                      className="slider-image-home"
                      src={'https://previews.123rf.com/images/kitch/kitch1503/kitch150300123/37641378-un-plano-corto-de-art%C3%ADculos-del-taller.jpg'}
                      alt="product"
                    /></h3>
          </div>
        </Slider>
      </div>
    <div className='container'>
        <div className='sub-container' onClick={() => {navigate('/services')}}>
        <img
                      className="product-image-home"
                      src={'https://previews.123rf.com/images/pupkis/pupkis1206/pupkis120600038/14036283-reglas-sobre-un-fondo-de-madera-.jpg'}
                      alt="product"
                    />
            <h1 className='header_Product_text'>Services</h1>
        </div>

        <div className='sub-container' onClick={() => {navigate('/products')}}>
        <img
                      className="product-image-home"
                      src={'https://previews.123rf.com/images/donatas1205/donatas12051404/donatas1205140400005/27508619-varios-carpinter%C3%ADa-herramientas-de-construcci%C3%B3n-que-cuelgan-sobre-el-tablero-.jpg'}
                      alt="product"
                    />
            <h1 className='header_Product_text'>Products</h1>
        </div>
    </div>
    </div>
    </>
  )
}

export default Home