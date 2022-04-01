import React, { useState, useEffect } from "react";
import { Spin, Table } from "antd";
import "./tableInfo.css";
import Search from "../Search/Search";
import Gists from "../Gists/Gists";
import { fetchRecordsBackend } from "../../fetchs/fetch";

const TableInfo = () => {
  const [dataSource, setDataSource] = useState([]); //for table data
  const [gistClick, setGistClick] = useState(); //for storing data of clicked gist.
  const [loading, setLoading] = useState(true); //loading.
  const [status, setStatus] = useState(); //for status message

  const getGistsData = async (page, pageSize) => {
    const response = await fetchRecordsBackend(page, pageSize, setStatus);

    if (response) {
      setLoading(false);
      setDataSource(response);
    }
  };

  useEffect(() => {
    getGistsData(1, 10);
  }, []);

  const columns = [
    {
      title: "Image",
      dataIndex: ["owner", "avatar_url"],
      render: (theImageURL) => (
        // <>abc</>
        <img className="user-img" alt={"No Data"} src={theImageURL} />
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
          <Search setDataSource={setDataSource} />
          {status === 200 && (
            <Table
              loading={loading}
              className="custom-table"
              columns={columns}
              dataSource={dataSource}
              onRow={(record) => ({
                onDoubleClick: () => setGistClick(record),
              })}
              rowKey="id"
              pagination={
                dataSource.length >= 10 &&
                dataSource.length && {
                  total: 500,
                  onChange: (page, pageSize) => {
                    getGistsData(page, pageSize);
                  },
                  onShowSizeChange: (current, pageSize) => {
                    getGistsData(current, pageSize);
                  },
                  hideOnSinglePage: true,
                }
              }
            />
          )}
          {status !== 200 && <Spin />}
        </>
      )}
      {gistClick && <Gists data={gistClick} setGistClick={setGistClick} />}{" "}
      {/* //want to ask whether send state for condtion or send a boolean state? */}
    </div>
  );
};

export default TableInfo;
