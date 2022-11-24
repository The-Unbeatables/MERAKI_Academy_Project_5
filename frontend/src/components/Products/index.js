import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setitem, setProduct } from "../../redux/reducers/products";
import "./style.css";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { FcBookmark } from "react-icons/fc";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { product } = useSelector((state) => {
    return {
      product: state.products.products,
    };
  });

  const [range, setRange] = useState("");
  const [pagenum, setPageNum] = useState(0);

  const handlePageClick = (data) => {
    setPageNum(data.selected);
  };

  const pageCount = 100;
  const getProduct = () => {
    axios
      .get(`https://animated-lolly-e71145.netlify.app/products/pagination/product/${pagenum}`)
      .then((result) => {
        dispatch(setProduct(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProduct();
  }, [pagenum]);

  const handelDetalis = (data) => {
    dispatch(setitem(data));
    navigate("/products/details");
  };
  const handelcategory = (str) => {
    axios
      .get(`https://animated-lolly-e71145.netlify.app/products/${str}`)
      .then((result) => {
        dispatch(setProduct(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

 

  const handelSearch = (search) => {
    axios
      .get(`https://animated-lolly-e71145.netlify.app/products/search/product/?title=${search}`)
      .then((result) => {
        dispatch(setProduct(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handelselct = (range) => {
    setRange(range);
    axios
      .post("https://animated-lolly-e71145.netlify.app/products/filter/Product", {
        max: range,
      })
      .then((result) => {
        console.log(result);
        dispatch(setProduct(result.data.result.rows));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="categoryAndSearch">
        <div className="category">
          <div
            className="type_category"
            onClick={() => {
              getProduct();
            }}
          >
            <h4>
              <b>All Products</b>
            </h4>
          </div>
          <div
            className="type_category"
            onClick={() => {
              handelcategory("Lubrication");
            }}
          >
            <h4>
              <b>Lubrication</b>
            </h4>
          </div>
          <div
            className="type_category"
            onClick={() => {
              handelcategory("Metal cutting tools");
            }}
          >
            <h4>
              <b>Metal cutting tools</b>
            </h4>
          </div>
          <div
            className="type_category"
            onClick={() => {
              handelcategory("Plumbing");
            }}
          >
            <h4>
              <b>Plumbing</b>
            </h4>
          </div>
          <div
            className="type_category"
            onClick={() => {
              handelcategory("Welding & Soldering");
            }}
          >
            <h4>
              <b>Welding & Soldering</b>
            </h4>
          </div>
        </div>
        <input  className="input_search displayNone" type="text" name="search" placeholder="Search.." onChange={(e) => {
            handelSearch(e.target.value);
          }}></input>
      </div>

      <div className="products">
        {product?.map((data, i) => {
         
          return (
            <div className="cardProduct" key={i}>
              <div className="sss">
                <div className="imgproduct">
                  <img src={`${data.image}`} />
                </div>
                <div className="info">
                  <div className="product_title">
                    <h2 className="title_card">{data.title}</h2>
                  </div>
                  {/* <div className="product_description">{data.description}</div> */}
                  <div className="product_price">{data.price} $</div>
                  <div>
                    <div className="detailes_container">
                      <FcBookmark
                        className="icons_show_detailes"
                        style={{ width: "20px", height: "20px" }}
                      />
                      <p
                        className="product_detailes_btns"
                        onClick={() => {
                          handelDetalis(data);
                        }}
                      >
                        Show More Details
                      </p>
                      <FcBookmark
                        className="icons_show_detailes"
                        style={{ width: "20px", height: "20px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="pagin">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          previousLabel="< back"
          containerClassName={"pagination justify-content-center p-3"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          nextClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
};

export default Products;
