import axios from "axios";
import { useState } from "react";
import "./style.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handelRegisterbutton = () => {
    axios
      .post("http://localhost:5000/register", {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        gender,
      })
      .then((result) => {
        setMessage(result.data.massage);
        setShowMessage(true);
      })
      .catch((err) => {
        setMessage(err.response.data.massage);
        setShowMessage(true);
      });
  };

  return (
    <>
    <div className="register_page_container">
        <div>
        <img
                      className="register_image"
                      src={'https://thumbs.dreamstime.com/b/3d-workers-team-work-24603364.jpg'}
                      alt="product"
                    />
        </div>

    <div className="Register">
      <h2>Register</h2>
      <div className="contanirRegister">
        <div className="inputRegister">
          <div className="threefirstinput">
            <input
              type="text"
              placeholder="First Name"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />

            <input
              type="text"
              placeholder="Last Name"
              onChange={(e) => {
                setLastname(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Gender"
              onChange={(e) => {
                setGender(e.target.value);
              }}
            />
          </div>
          <input
            type="email"
            placeholder="example@email.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="buttonRegister">
          <button
            onClick={() => {
              handelRegisterbutton();
            }}
          >
            {" "}
            Register{" "}
          </button>
        </div>
      </div>
      <div>{showMessage && <div>{message}</div>}</div>
    </div>
    </div>
    </>
  );
};

export default Register;
