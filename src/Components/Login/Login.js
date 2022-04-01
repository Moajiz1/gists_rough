import React, { useEffect, useState } from "react";
import { Menu, Dropdown, Button } from "antd";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { userConstants } from "../../constants/constants";
import { userDetails } from "../../constants/UserDetails";
import GitHubLogin from "../../Auth";
import { getUserToken } from "../util/Utfn";

const Login = () => {
  const [token, setToken] = useState(null); //for storing token for conditional rendering
  const [userInfo, setUserInfo] = useState({}); //for logged in user's information

  const { clientID, redirectUrl } = userConstants;
  const { name, avatar_url } = userInfo;

  let navigate = useNavigate();
  const onSuccessGithub = async (data) => {
    const { code } = data;
    const accessToken = await getUserToken(code);
    localStorage.setItem("accessToken", accessToken);
    setToken(accessToken);
    navigate("/personalgists");
    window.location.reload(false);
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("accessToken");
    setToken(null);
    navigate("/");
    window.location.reload(false);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <span>Sign in as {name}</span>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="form">Add Gist</Link>
      </Menu.Item>

      <Menu.Item key="3">
        <Link to="personalgists">Your Gists</Link>
      </Menu.Item>

      <Menu.Item key="4">
        <Link to="starredgists">Starred Gists</Link>
      </Menu.Item>

      <Menu.Item key="5">
        <Link to="userprofile">Github Profile</Link>
      </Menu.Item>
      <Menu.Item key="6">
        <span onClick={logout}>Log Out</span>
      </Menu.Item>
    </Menu>
  );

  useEffect(async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) setToken(accessToken);

    if (accessToken) {
      const response = await userDetails(accessToken);
      setUserInfo(response);
    }
  }, [token]);

  return (
    <div>
      {token && (
        <div className="PP">
          <ul className="list">
            {/* <li className="listItem">{userInfo}</li> */}
            <li className="list-item">
              <Dropdown overlay={menu} placement="bottomLeft">
                <img src={avatar_url} alt="" className="avatar" />
              </Dropdown>
            </li>
          </ul>
        </div>
      )}
      {!token && (
        <GitHubLogin
          clientId={clientID}
          onSuccess={onSuccessGithub}
          buttonText="LOGIN"
          className="btn-login"
          // valid={true}
          redirectUri={redirectUrl}
          scope="gist"
          uxMode="redirect"
        />
      )}
    </div>
  );
};

export default Login;
