import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import "./addgist.css";
import TextArea from "antd/lib/input/TextArea";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
import { createGist } from "../../fetchs/fetch";
import { successCheckAdd } from "../util/Utfn";

const AddGist = () => {
  const [gistForm, setGistForm] = useState({
    description: "",
    filename: "",
    content: "",
    public: true,
  }); //gist information form

  const { description, filename, content } = gistForm;
  const { Option } = Select;

  const submitGist = async (e) => {
    let dataCreateRes;
    e.preventDefault();
    if (content !== "") {
      dataCreateRes = await createGist({
        description: description,
        public: gistForm?.public,
        files: {
          [filename]: {
            content: content,
          },
        },
      });
      setGistForm({
        description: "",
        filename: "",
        content: "",
        public: true,
      });
    }

    successCheckAdd(dataCreateRes);
  };
  const inputDescHandler = (e) => {
    setGistForm((prevState) => {
      return {
        ...prevState,
        description: e.target.value,
      };
    });
  };

  const inputFileHandler = (e) => {
    setGistForm((prevState) => {
      return {
        ...prevState,
        filename: e.target.value,
      };
    });
  };
  const inputContentHandler = (e) => {
    setGistForm((prevState) => {
      return {
        ...prevState,
        content: e.target.value,
      };
    });
  };

  let navigate = useNavigate();
  const backBtn = () => {
    navigate("/userprofile");
  };

  const privacyCheck = (value) => {
    setGistForm((prevState) => {
      return {
        ...prevState,
        public: value,
      };
    });
  };

  const btnStyle = {
    backgroundColor: "#15a699 !important",
    color: "aliceblue",
    borderRadius: "5px",
  };
  return (
    <Form
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
    >
      <div className="form-div">
        <h1 className="add-heading">Add Gist</h1>
        <Form.Item
          className="width"
          label=""
          required
          tooltip="This is a required field"
        >
          {/* <h3 className="text-identifier">Description</h3> */}

          <Input
            className="gist-desc-form"
            placeholder="Enter Gist description..."
            value={description}
            onChange={inputDescHandler}
          />
        </Form.Item>

        <Form.Item label="" required tooltip="This is a required field">
          <Input
            className="gist-file-form"
            placeholder="Enter File Name..."
            value={filename}
            onChange={inputFileHandler}
          />
        </Form.Item>

        <Form.Item
          className="width"
          label=""
          required
          tooltip="This is a required field"
        >
          <TextArea
            rows="7"
            className="gist-content-form"
            placeholder="Enter File Content"
            value={content}
            onChange={inputContentHandler}
          />
        </Form.Item>

        <Select
          defaultValue="Public"
          style={{ width: 120, marginLeft: 320 }}
          onChange={privacyCheck}
        >
          <Option value="true">Public</Option>
          <Option value="false">Private</Option>
        </Select>
      </div>
      <Form.Item
        wrapperCol={{
          offset: 0,
          span: 16,
        }}
      >
        <Button
          className="btn-create basic-btn"
          type="primary"
          onClick={submitGist}
          disabled={!gistForm.content}
        >
          Create Gist
        </Button>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 0,
          span: 16,
        }}
      >
        <Button className="btn-add basic-btn" type="primary" onClick={backBtn}>
          <i className="fa fa-arrow-left"></i>Back
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddGist;
