import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "./logo.ico";
import SearchBar from "./SearchBar/SearchBar";
import { RiVideoAddLine } from "react-icons/ri";
import { BiUserCircle } from "react-icons/bi";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { Link } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth";
import Auth from "../../Pages/Auth/Auth";

function Navbar({ toggleDrawer, setEditCreateChanelBtn }) {
  const [AuthBtn, setAuthBtn] = useState(false);
  const CurrentUser = useSelector(state => state.currentUserReducer);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:"429392207966-rmbdvomffruesdiph08jrdo1u51bhb8l.apps.googleusercontent.com",
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const dispatch = useDispatch();

  const onSuccess = (response) => {
    const email = response?.profileObj.email;
    dispatch(login({ email }));
  };

  const onFailure = (response) => {
    console.error("Login failed", response);
    // Optionally show an error message to the user
  };

  return (
    <>
      <div className="Container_Navbar">
        <div className="Burger_Logo_Navbar">
          <div className="burger" onClick={toggleDrawer}>
            <p></p>
            <p></p>
            <p></p>
          </div>

          <Link to="/" className="logo_div_Navbar">
            <img src={logo} alt="Logo" />
            <p className="logo_title_navbar">YouTube</p>
          </Link>
        </div>
        <SearchBar />
        <RiVideoAddLine size={22} className={"vid_bell_Navbar"} />
        <IoMdNotificationsOutline size={22} className="vid_bell_Navbar" />
        <div className="Auth_cont_Navbar">
          {CurrentUser ? (
            <div className="Chanel_logo_App" onClick={() => setAuthBtn(true)}>
              <p className="fstChar_logo_App">
                {CurrentUser.result.name?.charAt(0).toUpperCase() || 
                 CurrentUser.result.email.charAt(0).toUpperCase()}
              </p>
            </div>
          ) : (
            <GoogleLogin
              clientId="YOUR_CLIENT_ID_HERE"
              onSuccess={onSuccess}
              onFailure={onFailure}
              render={(renderProps) => (
                <p onClick={renderProps.onClick} className="Auth_Btn">
                  <BiUserCircle size={22} />
                  <b>Sign in</b>
                </p>
              )}
            />
          )}
        </div>
      </div>
      {AuthBtn && (
        <Auth
          setEditCreateChanelBtn={setEditCreateChanelBtn}
          setAuthBtn={setAuthBtn}
          User={CurrentUser}
        />
      )}
    </>
  );
}

export default Navbar;
