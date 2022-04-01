import { Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import { fetchStarredGists, getStarredGists } from "../../fetchs/fetch";
import Gists from "../Gists/Gists";

const StarGists = () => {
  const [dataSource, setDataSource] = useState([]); //data for table
  const [loading, setLoading] = useState(true); //loading
  const [gistClick, setGistClick] = useState(); //for storing data of clicked gist.
  // const [status, setStatus] = useState();

  const getGistsData = async () => {
    const response = await getStarredGists();
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
          {dataSource && (
            <Table
              className="custom-table"
              loading={loading}
              rowKey="id"
              columns={columns}
              dataSource={dataSource}
              pagination={dataSource.length > 10}
              onRow={(record) => ({
                onDoubleClick: () => setGistClick(record),
              })}
            />
          )}
          {!dataSource && (
            // <div className="App App-header">Waiting for Data to load</div>
            <Spin />
          )}
        </>
      )}
      {gistClick && <Gists data={gistClick} setGistClick={setGistClick} />}
    </div>
  );
};

export default StarGists;
