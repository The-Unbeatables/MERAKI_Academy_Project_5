import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProduct, deleteProduct, setEditProduct } from '../../redux/reducers/products';
import "./style.css";
import { FcServices } from "react-icons/fc";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {token, products, editProduct} = useSelector((state) => {
    return {
      token: state.auth.token,
      products: state.products.products,
      editProduct: state.products.editProduct
    }
  })
    const getAllProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data) {
          console.log(res.data.result);
          dispatch(setProduct(res.data.result));
          setMessage("");
          setShow(true);
        } else throw Error;
      } catch (error) {
        if (!error.response.data) {
          return setMessage(error.response.data.message);
        }
        setMessage("Error happened while Get Data, please try again");
      }
    };

    const showEdit = (product) => {
      dispatch((setEditProduct(product)))
      navigate('/edit/product');
    };

    const deleteProducts = (id) => {
      axios
        .delete(`http://localhost:5000/products/delete/product/${id}`)
        .then((res) => {
          dispatch(deleteProduct(id));
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    useEffect(() => {
      getAllProducts();
    }, []);

  return (
    <>
    <div className='add_product'>
      <div><FcServices style={{width: '40px', height: '40px'}}/></div>
      <h4 onClick={() => {navigate('/add/product')}}><b>Add New Product</b></h4>
      <div><FcServices style={{width: '40px', height: '40px'}}/></div>
      <div className="back_to_home">
    </div>
      </div>
    <table>
        <thead>
          <tr>
            <th scope="col"><h4><b>Image</b></h4></th>
            <th scope="col"><h4><b>Title</b></h4></th>
            <th scope="col"><h4><b>Description</b></h4></th>
            <th scope="col"><h4><b>Price</b></h4></th>
            <th scope="col"><h4><b>Controls</b></h4></th>
          </tr>
        </thead>
        <tbody>
          {show &&
            products.map((iteam) => (
              console.log(iteam),
              <tr key={iteam.id}>
                <td data-label="Title"><img src={`${iteam.image}`} className="image_list" /></td>
                <td data-label="Title">{iteam.title}</td>
                <td data-label="Title">{iteam.description}</td>
                <td className='price' data-label="Price"><b>{iteam.price} $</b></td>
                <td data-label="Actions">
                  <div className="controller_icn">
                    <AiFillEdit
                    className="update_product"
                    style={{width: '40px', height: '40px', color: 'green'}}
                    onClick={() => showEdit(iteam)}/>
                    <div><AiFillDelete 
                      className="delete_product"
                    style={{width: '40px', height: '40px', color: 'red'}}
                      onClick={() => {
                        deleteProducts(iteam.id);
                      }}
                      /></div>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {message && <div>{message}</div>}
    </>
  )
}

export default AdminProducts