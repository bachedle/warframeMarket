import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
function CreatePost() {
  let navigate = useNavigate();
  const initialValues = {
    title: "",
    postText: "",
    username: "",
  };

  // xac dinh cac yeu cau ve kieu du lieu cho data nhap vao trong schema
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("write sth for f sake"),
    postText: Yup.string().required("write sth plz"),
    username: Yup.string().min(3).max(15).required(),
  });

  //call POST request to add new shit to db
  const onSubmit = (data) => {
    axios.post("http://localhost:2001/products", data).then((response) => {
      console.log("it worked");
      //navigate("/")
      //setListOfPosts(response.data);
    });
  };

  //nhung gi quan trong
  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Title: </label>
          <ErrorMessage name="title" component="span"></ErrorMessage>
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="title"
            placeholder="(Ex. Title...)"
          />
          <label>Post: </label>
          <ErrorMessage name="postText" component="span"></ErrorMessage>
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="postText"
            placeholder="(Ex. hello...)"
          />
          <label>username: </label>
          <ErrorMessage name="username" component="span"></ErrorMessage>
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="(Ex. con cac...)"
          />

          <button id="mySubmit" type="submit">
            Create Post
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
