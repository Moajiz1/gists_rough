import { Button, Input, Form, Space } from "antd";
import React, { useState } from "react";
import "./updategist.css";
import TextArea from "antd/lib/input/TextArea";
import { update } from "../../fetchs/fetch";
import { successCheck } from "../util/Utfn";

const UpdateGist = ({ gistUpdate, setUserExist }) => {
  const { id, description, files } = gistUpdate;

  let gistContent;
  let filename;
  if (files) {
    Object.values(files).map((file) => {
      filename = file.filename;
      gistContent = file.content;
    });
    // myContentArray = content.split('\n');
  }

  const [gistForm, setGistForm] = useState({
    description: description,
    filename: filename,
    content: gistContent,
    privacy: true,
  });

  const inputDescHandler = (e) => {
    setGistForm((prevState) => {
      return {
        ...prevState,
        description: e.target.value,
      };
    });
    console.log(e.target.value);
  };

  const inputContentHandler = (e) => {
    setGistForm((prevState) => {
      return {
        ...prevState,
        content: e.target.value,
      };
    });
  };

  const okBack = () => {
    setUserExist(false);
  };

  const fnCalls = async () => {
    let response;
    if (description !== "" && gistContent !== "") {
      response = await update(id, gistForm);
      successCheck(response);
    }
  };

  return (
    <>
      <div className="form-div">
        <h1>Edit Gist</h1>
        <Form.Item label="" required tooltip="This is a required field">
          <h3 className="text-identifier">Description</h3>
          <Input
            defaultValue={description}
            className="gist-desc-form"
            placeholder="Enter Gist description..."
            onChange={inputDescHandler}
          />
        </Form.Item>

        <Form.Item label="" required tooltip="This is a required field">
          <h3 className="text-identifier">Content</h3>
          <TextArea
            rows="7"
            defaultValue={gistContent}
            className="gist-content-form"
            placeholder="Enter File Content"
            onChange={inputContentHandler}
          />
        </Form.Item>
      </div>

      <Form.Item
        wrapperCol={{
          offset: 0,
          span: 16,
        }}
      >
        <Button
          className="btn-update basic-btn"
          type="primary"
          onClick={() => fnCalls()}
          // disabled={}
        >
          Update Gist
        </Button>
      </Form.Item>

      <Button className="btn-back basic-btn" type="primary" onClick={okBack}>
        <i className="fa fa-arrow-left"></i>Back
      </Button>
    </>
  );
};

export default UpdateGist;
