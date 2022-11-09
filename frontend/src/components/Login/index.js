import { React } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loggedin } from "../../redux/reducers/auth";
import axios from "axios";
import "./style.css";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageEmail, setMessageEmail] = useState('');

    const { token, userId, isLoggedIn} = useSelector((state) => {
        return {
            token: state.auth.token,
            isLoggedIn: state.auth.isLoggedIn,
            userId: state.auth.userId,
        };
    });

    const loginCustomer = async (e) => {
        try {
            const res = await axios.post(`http://localhost:5000/login/customer`,
            {
                email: email,
                password: password,
            }
            );
            if (res) {
                setMessage('');
                dispatch(setLogin({token: res.data.token, }));
                dispatch(setUserId({userId: res.data.userId}));
                navigate('/');
            } else {
                throw Error;
            }
        } catch (err) {
            if (err.response && err.response.data) {
                return setMessage(err.response.data.message);
            }
            setMessage('Error While Login, please try again');
        }
    };

    return (
        <>
        <div className="login">
            <h2 className="active">sign in</h2>
            <form>
                <span className="input">Email</span>
                <input
                className="text"
                type="email"
                placeholder="Enter Email"
                onChange={(e) => {
                    if (e.target.value !== " " || e.target.value !== "" || e.target.value.includes("@") || e.target.value.includes(".com")) {
                        setEmail(e.target.value);
                        setMessageEmail('');
                    } else {
                        setMessageEmail(' The Email must includes @ or .com')
                    }
                }}
                >
                </input>
                <p className="messagePara">{messageEmail}</p>
                <br></br>
                <span className="input">Password</span>
                <input
                className="text"
                type="password"
                placeholder="Enter Password"
                onChange={(e) => {
                    if (e.target.value.length <2 || e.target.value == "" || e.target.value == "") {
                        return setMessage('Please Enter a valid password, no less than two letters or two numbers')
                    } else {
                        setMessage('');
                        setPassword(e.target.value);
                    }
                }}>
                </input>
                <br></br>
                <button
                className="login_button"
                onClick={() => {loginCustomer()}}>Login</button>
            </form>
        </div>
        </>
    )
}