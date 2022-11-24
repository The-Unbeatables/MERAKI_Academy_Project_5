import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FcLeft } from "react-icons/fc";
import { useSelector } from "react-redux";
import "./style.css";

const Creat = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [items_left, SetItems_left] = useState(0);
    const [image, setImage] = useState("");
    const [file, setFile] = useState(null);
    const [message, setMeesage] = useState("");
    const [category, setCategories] = useState("");

    const {token} = useSelector((state) => {
        return {
            token: state.auth.token,
        }
    })

    const uploadImage = async () => {
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "eeshop");

      // send form to cloudenary
    await axios
        .post(`https://api.cloudinary.com/v1_1/dykjbbeoi/upload`, form)
        .then((result) => {
        setImage(result.data.secure_url);
        })
        .catch((err) => {
        console.log(err);
        throw err;
        });
    };

    const addNewProduct = async () => {
    try {
        await axios
        .post(
            "https://animated-lolly-e71145.netlify.app/products/",
            {
            title,
            description,
            price,
            category,
            items_left,
            image,
            },
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        )
    } catch (err) {
        throw err;
    }
    };

    return (
    <>
        <div className="back">
        <FcLeft
            className="back-icon-react"
            style={{width: '50px', height: '50px', color: 'black'}}
            onClick={() => {
            navigate(-1);
            }}
        />
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

        <button className="upload_image_btn" onClick={uploadImage}>upload</button>
            </div>
        

        <textarea
            className="input-edit-product"
            type="text"
            placeholder="Title"
            onChange={(e) => {
            setTitle(e.target.value);
            }}
        ></textarea>

        <textarea
            className="input-edit-product"
            type="text"
            placeholder="Discription"
            onChange={(e) => {
            setDescription(e.target.value);
            }}
        ></textarea>

        <input
            className="input-edit-product"
            type="number"
            placeholder="Price"
            onChange={(e) => {
            setPrice(e.target.value);
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


        <textarea
            className="input-edit-product"
            type="tex"
            placeholder="Categories"
            onChange={(e) => {
            setCategories(e.target.value);
            }}
        ></textarea>

        <div>
            <button
            className="button-update-product"
            onClick={(e) => {
                addNewProduct();
                setMeesage("Done! Create New Product");
            }}
            >
            CREATE
            </button>
        </div>

        {message && <div className="messamge-update-product">{message}</div>}
        </div>
    </>
    );
};

export default Creat;