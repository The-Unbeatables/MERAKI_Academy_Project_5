import React, { useContext, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { FcLeft } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { updateProduct } from "../../../redux/reducers/products";

const EditProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token, editProduct } = useSelector((state) => {
    return {
      token: state.auth.token,
      editProduct: state.products.editProduct,
    };
  });

  const [title, setNewTitle] = useState("");
  const [description, setNewDescription] = useState("");
  const [price, setNewPrice] = useState(0);
  const [items_left, SetItems_left] = useState(0);
  const [message, setMeesage] = useState("");
  const [image, setNewImage] = useState("");
  const [category, setCategories] = useState("");
  const [file, setFile] = useState(null);


  const updateProducts = () => {
    console.log(editProduct);
    axios
      .put(
        `http://localhost:5000/products/${1}`,
        {
          image,
          title,
          description,
          price,
          items_left,
          category,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((result) => {
        dispatch(updateProduct(result.data.result));
      })
      .catch((err) => {
        // console.log(err);
        throw err;
      });
  };

  // cloudName => dykjbbeoi
  // POST https://api.cloudinary.com/v1_1/demo/image/upload
  // add upload preset =>  eeshop

  const uploadImage = async () => {
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "eeshop");

    // send form to cloudenary
    await axios
      .post(`https://api.cloudinary.com/v1_1/dykjbbeoi/upload`, form)
      .then((result) => {
        // console.log(result.data.secure_url);
        setNewImage(result.data.secure_url);
      })
      .catch((err) => {
        // console.log(err);
        console.log(err);
        throw err;
      });
  };

  return (
    <>
      <div className="back">
        <FcLeft
          className="back-icon-react"
          size={30}
          onClick={() => {
            navigate(-1);
          }}
        />
        <p className="back-string">Back</p>
      </div>

      <div className="container-edit-product">
        <div className="upload_image">
          <input
            className="upload-image"
            type="file"
            id="myFile"
            name="filename"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />

          <button className="upload_image_btn" onClick={uploadImage}>
            upload
          </button>
        </div>

        <textarea
          className="input-edit-product"
          type="text"
          placeholder="Title"
          onChange={(e) => {
            setNewTitle(e.target.value);
          }}
        ></textarea>

        <textarea
          className="input-edit-product"
          type="text"
          placeholder="Discription"
          onChange={(e) => {
            setNewDescription(e.target.value);
          }}
        ></textarea>

        <input
          className="input-edit-product"
          type="number"
          placeholder="Price"
          onChange={(e) => {
            setNewPrice(e.target.value);
          }}
        ></input>

        <input
          className="input-edit-product"
          type="number"
          placeholder="Quantity"
          onChange={(e) => {
            SetItems_left(e.target.value);
          }}
        ></input>

        <button
          className="button-update-product"
          onClick={(e) => {
            updateProducts();
            setMeesage("Done! Update Product");
          }}
        >
          UPDATE
        </button>

        {message && <div className="messamge-update-product">{message}</div>}
      </div>
    </>
  );
};

export default EditProduct;
