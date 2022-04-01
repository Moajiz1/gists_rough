import React, { useContext, useEffect, useState } from "react";
import { userDetails } from "../../constants/UserDetails";
import "./userprofile.css";
import Gist from "react-gist";
import { Button, Popconfirm, Spin } from "antd";
import { editRecord, gistDelete, userTableRecord } from "../../fetchs/fetch";
import UpdateGist from "../Update Gist/UpdateGist";

const UserProfilee = () => {
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState({});
  const [userExist, setUserExist] = useState(false);
  const [loading, setLoading] = useState(false);

  const [dataSource, setDataSource] = useState();
  const [dataGet, setDataGet] = useState();

  const userData = async () => {
    const accessToken = localStorage.getItem("accessToken");
    setToken(accessToken);
    const response = await userDetails(accessToken).then((data) => data);
    if (response) {
      setUserInfo(response);
    }
    return response;
  };

  const { login } = userInfo;

  const userGistsList = async () => {
    setLoading(true);
    if (login) {
      const response = await userTableRecord(login);
      console.log(response);
      setLoading(false);
      if (response) {
        console.log(response);
        setDataSource(response);
        console.log(dataSource);
      }
    }
  };

  // const updateGist = (e) => {
  //   e.preventDefault();
  //   gistUpdate();
  // };

  const deleteGist = async (id) => {
    const response = await gistDelete(id);
    if (response) {
      setDataSource(dataSource.filter((el) => el.id !== id));
    }
  };

  const editData = async (dataGet) => {
    const response = await editRecord(dataGet);
    console.log(response);

    if (response) {
      setDataGet(response);
      setUserExist(true);
    }
  };
  useEffect(() => {
    userData();
    userGistsList(login);
  }, []);

  return (
    <div>
      {!userInfo && <Spin />}

      {userExist && (
        <UpdateGist
          dataGet={dataGet}
          // setDataSource={setDataSource}
          setUserExist={setUserExist}
        />
      )}

      {!userExist && (
        <div className="wrapper">
          <div key="{userInfo}" className="left">
            <img src={userInfo.avatar_url} alt="" className="icon" />
            <h2 className="name">{userInfo.name}</h2>
            <Button
              className="btn-profile"
              href={userInfo.html_url}
              target="_blank"
            >
              View Github Profile
            </Button>
          </div>

          <div className="center">
            <div className="line" />
            {/* <div className="or">OR</div> */}
          </div>

          {!loading && (
            <div className="right">
              <div className="user-detailss">
                {dataSource &&
                  dataSource.map((gist, index) => (
                    <div className="gist-div" key={index}>
                      {gist?.id && (
                        <>
                          <img
                            src={gist?.owner?.avatar_url}
                            alt=""
                            className="avatar"
                          />
                          <a
                            key="{userInfo}"
                            href={gist?.owner?.html_url}
                            className="name"
                            target={"_blank"}
                          >
                            {userInfo.login}
                          </a>
                          <span className="btn-container">
                            <Popconfirm
                              title="Are you sure？"
                              okText="Yes"
                              cancelText="No"
                              onConfirm={() => deleteGist(gist?.id)}
                            >
                              <Button className="btn-delete">
                                <i className="fa fa-trash-o"></i>
                              </Button>
                            </Popconfirm>
                            <Button onClick={() => editData(gist)}>
                              <i className="fa fa-pencil-square-o"></i>
                            </Button>
                          </span>
                          <Gist key="{dataSource}" id={gist?.id} file={null} />
                        </>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
          {loading && <Spin />}
        </div>
      )}
    </div>
  );
};

export default UserProfilee;
