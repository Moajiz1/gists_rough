import { Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import { fetchPrivateGists } from "../../fetchs/fetch";
import Gists from "../Gists/Gists";

const UserGists = () => {
  const [dataSource, setDataSource] = useState([]); // for data of table
  const [loading, setLoading] = useState(true); //loading
  const [gistClick, setGistClick] = useState(); //for storing data of clicked gist.
  const [status, setStatus] = useState(); //for status message

  const getGistsData = async () => {
    const response = await fetchPrivateGists(setStatus);

    if (response) {
      setLoading(false);
      setDataSource(response);
    }
  };

  useEffect(() => {
    getGistsData();
  }, []);

  const columns = [
    {
      title: "Image",
      dataIndex: ["owner", "avatar_url"],
      render: (theImageURL) => (
        <img className="user-img" alt={theImageURL} src={theImageURL} />
      ), // 'theImageURL' is the variable you must declare in order the render the URL
      key: "image",
    },
    {
      title: "ID",
      dataIndex: ["id"],
      key: "id",
    },
    {
      title: "Name",
      dataIndex: ["owner", "login"],
      key: "name",
    },
    {
      title: "Time",
      dataIndex: ["updated_at"],
      key: "time",
    },
  ];

  return (
    <div className="table-parent">
      {!gistClick && (
        <>
          {status === 200 && (
            <Table
              rowKey="id"
              className="custom-table"
              loading={loading}
              columns={columns}
              dataSource={dataSource}
              pagination={dataSource.length > 10}
              onRow={(record) => ({
                onDoubleClick: () => setGistClick(record),
              })}
            />
          )}
        </>
      )}
      {status !== 200 && (
        // <div className="App App-header">Waiting for Data to load</div>
        <Spin />
      )}
      {gistClick && <Gists data={gistClick} setGistClick={setGistClick} />}
    </div>
  );
};

export default UserGists;
