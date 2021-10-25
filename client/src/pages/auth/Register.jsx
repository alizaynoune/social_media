import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  Select,
  DatePicker,
  Steps,
  Switch,
  message,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  SolutionOutlined,
  LoadingOutlined,
  SmileOutlined,
  IdcardOutlined,
  FileTextOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { Container, Card, Alert, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../actions";
import "antd/dist/antd.css";


function RegisterPage(props) {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [isValid, setIsValid] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const validation = (name, value) => {
    let error = "";
    switch (name) {
      case "firstName":
        if (value.length < 3 || value.length > 20) {
          error = "First name must be between 3 and 20 characters";
        } else if (!value.match(/^[a-zA-Z]+$/)) {
          error = "First name must be alphabetic";
        }
        break;
      case "lastName":
        if (value.length < 3 || value.length > 20) {
          error = "Last name must be between 3 and 20 characters";
        } else if (!value.match(/^[a-zA-Z]+$/)) {
          error = "Last name must be alphabetic";
        }
        break;
      case "email":
        // if (!value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
        //   error = "Invalid email address";
        // }
        break;
      case "password":
        if (!value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
          error = "Password must be at least 8 characters and contain at least one lowercase letter, one uppercase letter, one number and one special character";
        }
        break;
      case "confirmPassword":
        if (value !== values.password) {
          error = "Passwords must match";
        }
        break;
      default:
        break;
    }
    if (error) {
      setErrors({ ...errors, [name]: error });
      setIsValid({ ...isValid, [name]: false });
    } else {
      setErrors({ ...errors, [name]: "" });
      setIsValid({ ...isValid, [name]: true });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    validation(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      props.register(values);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }

  };

  useEffect(() => {
    if (props.loading === false) {
      setIsLoading(false);
      if (props.success === true) {
        message.success("Registration successful");
        props.history.push("/");
      }
      if (props.error) {
        // console.log(props.error, 'error');
        message.error(props.error.message, 2);
        props.error?.errors?.forEach((error) => {
          // validation(error.param, error.msg);
          setErrors({ ...errors, [error.param]: error.msg });
        }
        );
      }
    }
  }, [props.loading]);


  useEffect(() => {
    console.log(isValid);
  }, [isValid])

  return (
    <Container className="themed-container" fluid="xm">
      <Col md={10} xm={12} lg={7} xl={7} className="mx-auto">
        <Card className="text-center">
          <Card.Header>
            <h2>Register</h2>
          </Card.Header>
          <Card.Body>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ values }}
            >
              <Form.Item
                name="fitstName"
                validateStatus={
                  errors.firstName ? "error" : isValid.firstName ? "success" : ""
                }
                help={errors.firstName ? errors.firstName : null}
                // onBlur={handleTouched}
                hasFeedback
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="First name"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name="lastName"
                validateStatus={
                  errors.lastName ? "error" : isValid.lastName ? "success" : ""
                }
                help={errors.lastName ? errors.lastName : null}
                // onBlur={handleTouched}
                hasFeedback
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Last name"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                name="email"
                validateStatus={
                  errors.email ? "error" : isValid.email ? "success" : ""
                }
                help={errors.email ? errors.email : null}
                // onBlur={handleTouched}
                hasFeedback
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                hasFeedback
                name="password"
                validateStatus={
                  errors.password ? "error" : isValid.password ? "success" : ""
                }
                help={
                  errors.password ? errors.password : null
                }
              // onBlur={handleTouched}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item
                hasFeedback
                name="confirmPassword"
                validateStatus={
                  errors.confirmPassword ? "error" : isValid.confirmPassword
                }
                help={
                  errors.confirmPassword ? errors.confirmPassword : null
                }
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  onClick={handleSubmit}
                  loading={isLoading}
                  disabled={!Object.values(isValid).every(Boolean)}
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
          </Card.Body>
          <Card.Footer className="text-center d-flex justify-content-between">
            <Link to="/forgot-password">Forgot password</Link>
            <Link to="/login">Login</Link>
          </Card.Footer>
        </Card>
      </Col>
    </Container>
  );
}

const mapStateToProps = ({ auth }) => {
  console.log(auth, 'auth')
  return {
    isAthenticated: auth.isAuthenticated,
    error: auth.error,
    loading: auth.loading,
    success: auth.success
  };
};

const Register = connect(mapStateToProps, { register })(RegisterPage);

export { Register };
