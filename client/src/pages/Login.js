import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "../styles/Loginpage.css";

const Login = () => {
  const img =
    "data:image/jpeg;base64,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";
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/users/login", values);
      setLoading(false);
      message.success("login success");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
    }
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <div className="login-page ">
        {loading && <Spinner />}
        <div className="row container">
          <h1 className="text-center">Hackathon Management Web Application</h1>
          <div className="col-md-6">
            <img src={img} alt="login-img" width={"100%"} height="100%" />
          </div>
          <div className="col-md-4 login-form">
            <Form layout="vertical" onFinish={submitHandler}>
              <h1>Login Form</h1>

              <Form.Item label="Email" name="email">
                <Input type="email" required />
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input type="password" required />
              </Form.Item>
              <div className="d-flex justify-content-between">
                <Link to="/register">
                  Not a user ? Click Here to regsiter !
                </Link>
                <button className="btn ">Login</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
