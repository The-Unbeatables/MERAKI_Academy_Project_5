import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

const Home = () => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
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
            <h3><img
                  onLoad={() => window.dispatchEvent(new Event("resize"))}
                  className="image_slider"
                  src={
                    "https://thumbs.dreamstime.com/b/painter-man-young-painting-roller-house-renovation-background-84320625.jpg"
                  }
                  alt="product"
                /></h3>
          </div>
          <div>
            <h3><img
                  onLoad={() => window.dispatchEvent(new Event("resize"))}
                  className="image_slider"
                  src={
                    "https://thumbs.dreamstime.com/b/collage-handsome-carpenters-white-background-176679569.jpg"
                  }
                  alt="product"
                /></h3>
          </div>
          <div>
            <h3><img
                  onLoad={() => window.dispatchEvent(new Event("resize"))}
                  className="image_slider"
                  src={
                    "https://thumbs.dreamstime.com/b/banner-mini-garden-tools-green-background-minimal-creative-concept-shovels-rakes-place-text-gardening-copy-180190404.jpg"
                  }
                  alt="product"
                /></h3>
          </div>
          <div>
            <h3><img
                  onLoad={() => window.dispatchEvent(new Event("resize"))}
                  className="image_slider"
                  src={
                    "https://thumbs.dreamstime.com/b/huge-set-collection-yellow-blue-wooden-diy-hand-tools-isolated-white-background-hand-tools-set-collection-109503489.jpg"
                  }
                  alt="product"
                /></h3>
          </div>
          <div>
            <h3><img
                  onLoad={() => window.dispatchEvent(new Event("resize"))}
                  className="image_slider"
                  src={
                    "https://thumbs.dreamstime.com/b/diy-home-renovation-do-yourself-construction-concept-tools-hardware-swatches-wooden-table-top-view-57258521.jpg"
                  }
                  alt="product"
                /></h3>
          </div>
          <div>
            <h3><img
                  onLoad={() => window.dispatchEvent(new Event("resize"))}
                  className="image_slider"
                  src={
                    "https://thumbs.dreamstime.com/b/panorama-banner-assorted-hand-tools-wood-panorama-banner-assorted-hand-tools-wood-renovations-diy-building-125757940.jpg"
                  }
                  alt="product"
                /></h3>
          </div>
        </Slider>
        <div className="text_info"><h1 className="header_form_text">More Great Deals</h1></div>
      </div>
        <div className="container_deals">
          <div
            className="sub-container"
            onClick={() => {
              navigate("/services");
            }}
          >
            <img
              className="product-image-home"
              src={
                "https://thumbs.dreamstime.com/b/construction-man-20437204.jpg"
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
                "https://thumbs.dreamstime.com/b/wall-tools-25971185.jpg"
              }
              alt="product"
            />
            <h1 className="header_Product_text">Products</h1>
          </div>
        </div>
        <div className="brands_info"><h1 className="brands_text">Brands</h1></div>
        <div className="brand_container">
          <img className="brand_img" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUdemSTt5MsilPIEmIPdRTwAsaeEl-gD-b4w&usqp=CAU"} alt="brand"/>

          <img className="brand_img" src={"https://i.ytimg.com/vi/P0pCIW9n9hk/mqdefault.jpg"} alt="brand"/>

          <img className="brand_img" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNqEwp0XWXH7H-l1KFPf_45xa2anTGuXCBsw&usqp=CAU"} alt="brand"/>

          <img className="brand_img" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnbMJZgWR2gJIqfhdeyisxPx5VznuX4WensA&usqp=CAU"} alt="brand"/>

          <img className="brand_img" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBmd9ilLIyBMvHbZxcxHBVIqhfqmlP7ZUzHg&usqp=CAU"} alt="brand"/>

          <img className="brand_img" src={"https://m.media-amazon.com/images/I/31G32Q9yezL._AC_SY580_.jpg"} alt="brand"/>
        </div>
        <div className="brand_container">
          <img className="brand_img" src={"https://static.wixstatic.com/media/92a91e_4df27a7a71944f0fb8cb353e419d40ac~mv2_d_1772_1772_s_2.jpg/v1/crop/x_0,y_529,w_1772,h_715/fill/w_260,h_104,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/PAD%20Grey%20logo.jpg"} alt="brand"/>

          <img className="brand_img" src={"https://rkwltd.com:8002/media/logo/Breville_Logo.jpg"} alt="brand"/>

          <img className="brand_img" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3BL6ybtLS7Q4oqgPNV1GOIxrnU5f5HUZ9pQNEpDoZWz08j05ecjO-bvJpybdjN7SsLuI&usqp=CAU"} alt="brand"/>

          <img className="brand_img" src={"https://seeklogo.com/images/T/TF1-logo-DC5F5BE4B1-seeklogo.com.png"} alt="brand"/>

          <img className="brand_img" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcsW_eHxF_etXOvKKy4oVLBqjLc2cUBMvR_DhDxTC1YPUvD3c98Csn3PfHmEEm7c7LD00&usqp=CAU"} alt="brand"/>

          <img className="brand_img" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmn0IFGfw2KHYnMl9D7oDWA52hmLsDeNc8sNp3RVp_Amp8hJ7UlsxZ3hrnQr1BAf7TvYY&usqp=CAU"} alt="brand"/>
        </div>
        <div className="contact_info"><h1 className="contact_form_text">Contact Form</h1></div>
        <div class="container">
          <div class="row">
            <div class="col-lg-7 mx-auto">
              <div class="card mt-2 mx-auto p-4 bg-light">
                <div class="card-body bg-light">
                  <div class="container">
                    <form id="contact-form" role="form">
                      <div class="controls">
                        <div class="row">
                          <div class="col-md-6">
                            <div class="form-group">
                              <label for="form_name">Firstname</label>
                              <input
                                id="form_name"
                                type="text"
                                name="name"
                                class="form-control"
                                placeholder="Please enter your firstname"
                                required="required"
                                data-error="Firstname is required."
                              />
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                              <label for="form_lastname">Lastname</label>
                              <input
                                id="form_lastname"
                                type="text"
                                name="surname"
                                class="form-control"
                                placeholder="Please enter your lastname"
                                required="required"
                                data-error="Lastname is required."
                              />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <div class="form-group">
                              <label for="form_email">Email</label>
                              <input
                                id="form_email"
                                type="email"
                                name="email"
                                class="form-control"
                                placeholder="Please enter your email"
                                required="required"
                                data-error="Valid email is required."
                              />
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                              <label for="form_need">
                                Please specify your need
                              </label>
                              <select
                                id="form_need"
                                name="need"
                                class="form-control"
                                required="required"
                                data-error="Please specify your need"
                              >
                                <option value="" selected disabled>
                                  --Select Your Issue--
                                </option>
                                <option>Request Invoice for order</option>
                                <option>Request order status</option>
                                <option>Haven't received cashback yet</option>
                                <option>Other</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-12">
                            <div class="form-group">
                              <label for="form_message">Message</label>
                              <textarea
                                id="form_message"
                                name="message"
                                class="form-control"
                                placeholder="Write your message here."
                                rows="4"
                                required="required"
                                data-error="Please, leave us a message."
                              ></textarea>
                            </div>
                          </div>
                          <div class="col-md-12">
                            <input
                              type="submit"
                              class="btn btn-success btn-send  pt-2 btn-block
                            "
                              value="Send Message"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
