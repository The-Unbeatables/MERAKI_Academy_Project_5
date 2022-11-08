import "./style.css";
import { Link, useNavigate } from "react-router-dom";


const Footer = () => {
    const history = useNavigate();
    return (
        <>
        <footer className="footer">
        <div className="div1">
          <div className="left-area">
            <h2 className="header_footer">Content</h2>
            <ul className="box">
              <li className="li_footer">websiteName.support@gmail.com</li>
              <li className="li_footer">+189-8469-1898</li>
              <li className="li_footer">Amman, JORDAN</li>
              <li className="li_footer">www.websiteName.com</li>
              <li className="li_footer">9989</li>
            </ul>
          </div>
        </div>

        <div className="div2-grid">
          <ul className="reigth-area">
            <div>
              <li className="link-area">
                <h2 className="header_footer">Useful Link</h2>
                <ul className="box h-box">
                  <li>
                    <p className="links" onClick={() => {history("/")}}>Home</p>
                  </li>
                  <li className="li_footer">
                    <p className="links" onClick={() => {history("/")}}>Pricing</p>
                  </li>
                  <li className="li_footer">
                    <p className="links" onClick={() => {history("/")}}>Policy</p>
                  </li>
                  <li className="li_footer">
                    <p className="links" onClick={() => {history("/")}}>Terms</p>
                  </li>
                </ul>
              </li>
            </div>

            <div>
              <li className="conditons_footer">
                <h3 className="header_footer">Conditions of Use</h3>
                <ul className="box">
                  <li className="li">
                    <p onClick={()=>{history("customerService/help")}}> Help & Customer Service </p>
                  </li>
                </ul>
              </li>
            </div>
          </ul>
        </div>
        <div>
          <h2 className="header_footer">Newletter</h2>
          <form action="" className="form-search">
            <div className="search-box">
              <input type="text" name="" id=""></input>
              <div>
              <button className="btnn" type="submit">
                search
              </button>
              </div>
              
            </div>
          </form>

          <div className="socials">
            <Link>
              <i className="fa fa-facebook">
                {/* <FaFacebookF /> */}
              </i>
            </Link>
            <Link>
              <i className="fa fa-instagram">
                {/* <FaInstagram /> */}
              </i>
            </Link>
            <Link>
              <i className="fa fa-twitter">
                {/* <BsTwitter /> */}
              </i>
            </Link>
            <Link>
              <i className="fa fa-youtube">
                {/* <ImYoutube /> */}
              </i>
            </Link>
          </div>
        </div>
        <div className="footer-buttom">
          <h2 className="web">
            {/* e <FcShipped size={50} /> shop */}
          </h2>
          <p className="reversed">All Right reversed by &copy;creativo 2022</p>
        </div>
      </footer>
        </>
    )
};

export default Footer;