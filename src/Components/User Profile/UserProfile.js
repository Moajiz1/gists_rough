import React, { useEffect, useState } from "react";
import { userDetails } from "../../constants/UserDetails";
import "./userprofile.css";
import Gist from "react-gist";
import { Button, Popconfirm, Spin } from "antd";
import { editRecord, gistDelete, userTableRecord } from "../../fetchs/fetch";
import UpdateGist from "../Update Gist/UpdateGist";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({}); // state for storing login User information
  const [userExist, setUserExist] = useState(false); // * for condition on rendering component.
  const [loading, setLoading] = useState(false); // * for loading
  const [gistSource, setGistSource] = useState([]); // * for gist records of login user
  const [gistUpdate, setGistUpdate] = useState([]); // * for storing Gist data upon updation applies.

  const { avatar_url, name, html_url, login } = userInfo;
  const { id, owner } = gistSource;

  // console.log(userInfo);

  const userGistsList = async () => {
    setLoading(true);
    const response = await userTableRecord(login);
    if (response) {
      setLoading(false);
      setGistSource(response);
    }
  };

  const deleteGist = async (id) => {
    const response = await gistDelete(id);

    if (response) {
      setGistSource(gistSource.filter((el) => el.id !== id));
    }
  };

  //storing
  const editData = async (gistUpdate) => {
    const response = await editRecord(gistUpdate);

    if (response) {
      setGistUpdate(response);
      setUserExist(true);
    }
  };

  useEffect(async () => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await userDetails(accessToken);
    setUserInfo(response);
    userGistsList();
  }, [login]);

  return (
    <div>
      {!userInfo && <Spin />}

      {userExist && (
        <UpdateGist gistUpdate={gistUpdate} setUserExist={setUserExist} />
      )}

      {!userExist && (
        <div className="wrapper">
          <div className="left">
            <img src={avatar_url} alt="" className="icon" />
            <h2 className="name">{name}</h2>
            <Button className="btn-profile" href={html_url} target="_blank">
              View Github Profile
            </Button>
          </div>

          <div className="center">
            <div className="line" />
            {/* <div className="or">OR</div> */}
          </div>

          {loading && <Spin />}

          <div className="right">
            {gistSource?.map((gist, index) => (
              <div key={index + gist.owner.avatar_url} className="gist-div">
                {gist.id && (
                  <>
                    <img
                      src={gist.owner.avatar_url}
                      alt=""
                      className="avatar"
                    />
                    <a
                      key="{userInfo}"
                      href={gist.owner.html_url}
                      className="name"
                      target={"_blank"}
                    >
                      {login}
                    </a>
                    <span className="btn-container">
                      <Popconfirm
                        title="Are you sure？"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => deleteGist(gist.id)}
                      >
                        <Button className="btn-delete btn">
                          <i className="fa fa-trash-o icon"></i>
                        </Button>
                      </Popconfirm>

                      <Button className="btn" onClick={() => editData(gist)}>
                        <i className="fa fa-pencil-square-o icon"></i>
                      </Button>
                    </span>

                    <Gist id={gist.id} file={null} />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
