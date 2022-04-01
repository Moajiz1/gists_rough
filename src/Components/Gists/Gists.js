import React, { useEffect, useState } from "react";
import Gist from "react-gist";
import "./gists.css";
import { Button, Spin } from "antd";
import {
  checkStar,
  forkAGists,
  localToken,
  starAGist,
  UnStarAGist,
} from "../../fetchs/fetch";
import { successCheckFork } from "../util/Utfn";

const Gists = ({ data, setGistClick }) => {
  const [isOk, setIsOk] = useState({ star: false, fork: false }); // for fork & star
  const [loading, setLoading] = useState(true); // loading
  const [starResp, setStarResp] = useState(); // for checking specific star responase whethear its already starred or not.

  // const [gistSource, setGistSource] = useState([]);
  // const [checkFork, setCheckFork] = useState([]);

  const { star, fork } = isOk;
  const { id, owner, updated_at, files } = data; // data of clicked gist
  const { avatar_url, login, html_url } = owner; //further destructuring

  let fileNameCompare;
  if (files) {
    Object.values(files).map((file) => {
      fileNameCompare = file.filename;
    });
  }
  // console.log(fileNameCompare);

  const gistStar = async () => {
    if (!star) {
      const res = await starAGist(id);
      if (res === 204 && !star) {
        setIsOk((prevState) => {
          return {
            ...prevState,
            star: true,
          };
        });
      }
    } else if (star) {
      const res = await UnStarAGist(id);
      if (res === 204 && star) {
        setIsOk((prevState) => {
          return {
            ...prevState,
            star: false,
          };
        });
      }
    }
  };

  const gistFork = async () => {
    let res;
    if (!fork) {
      res = await forkAGists(id);
      if (res === 201 && !fork) {
        setIsOk((prevState) => {
          return {
            ...prevState,
            fork: true,
          };
        });
        successCheckFork(res);
      } else {
        successCheckFork(res);
      }
    } else {
      successCheckFork();
    }
  };

  const handleClick = () => {
    setGistClick(null);
  };

  const checkStarFinal = () => {
    if (starResp === 204) {
      setIsOk((prevState) => {
        return {
          ...prevState,
          star: true,
        };
      });
    }
  };

  // const userGistsList = async () => {
  //   const response = await userTableRecord();
  //   setCheckFork(response);
  //   // console.log(response);
  //   let gist = [];
  //   checkFork.forEach((element) => {
  //     gist = element;
  //     // console.log(gist.files);
  //     const { files } = gist;

  //     let listFilename;
  //     if (files) {
  //       Object.values(files).map((file) => {
  //         listFilename = file.filename;
  //       });
  //     }
  //     setGistSource(listFilename);

  //     if (listFilename === fileNameCompare) {
  //       setIsOk((prevState) => {
  //         return {
  //           ...prevState,
  //           fork: true,
  //         };
  //       });
  //     }
  //   });
  // };
  // console.log(gistSource);

  useEffect(() => {
    if (data) {
      checkStarFinal();
      setLoading(false);
      if (localToken) {
        checkStar(id, setStarResp);
        // userGistsList();
      }
      // checkFork(id, setForkBoolean);
    }
  }, [starResp]);

  const checkedStar = {
    fontWeight: isOk.star ? "bolder" : "",
    color: "#15a699",
  };
  const checkedFork = {
    fontWeight: isOk.fork ? "bolder" : "",
    color: "#15a699",
  };

  return (
    <>
      {data && (
        <div className="gist-info">
          <div className="user-detail">
            <img src={avatar_url} alt="" className="avatar" />{" "}
            <a href={html_url} target="_blank" className="name">
              {login}
            </a>
            <p className="created">Created at {updated_at}</p>
          </div>
          <Button className="back-btn" onClick={handleClick}>
            <i className="fa fa-arrow-left"> Back</i>
          </Button>

          {localToken && !loading ? (
            <ul className="action-btn">
              <i
                className={
                  !star ? `fa fa-star-o fa-spin fa-lg` : "fa fa-star-o fa-lg"
                }
                onClick={gistStar}
                style={checkedStar}
              ></i>
              <i
                className={"fa fa-flag-o fa-lg"}
                onClick={gistFork}
                style={checkedFork}
              ></i>
            </ul>
          ) : (
            <ul className="action-btn">Login to Star & fork</ul>
          )}
          {loading && <Spin />}
          <Gist id={id} file={null} />
        </div>
      )}
      {!data && <>No Data Found!</>}
    </>
  );
};

export default Gists;
