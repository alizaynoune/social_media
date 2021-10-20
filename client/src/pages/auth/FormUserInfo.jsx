import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  Select,
  DatePicker,
  Steps,
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
  MailOutlined
} from "@ant-design/icons";
import ColumnGroup from "rc-table/lib/sugar/ColumnGroup";

const FormUserInfoComponent = (props) => {
  const {
    step,
    values, setValues,
    errors, setErrors,
    stepStatus, setStepStatus,
    isValid, setIsValid,

  } = props;
  const [isTouched, setIsTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });


  const validate = (name, value) => {
    let error = "";
    console.log(name , '<<name')
    switch (name) {
      case "firstName":
        if (!value) {
          error = "First name is required";
        } else if (!/^[A-Za-z]+$/i.test(value)) {
          error = "First name must contain only characters"
        }
        break
      case "lastName":
        if (!value) {
          error = "Last name is required";
        } else if (!/^[A-Za-z]+$/i.test(value)) {
          error = "Last name must contain only characters"
        }
        break
      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
          error = "Invalid email address";
        }
        break;
      case "password":
        if (!value) {
          error = "Password is required";
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(value)) {
          error = "Password must contain at least 8 characters, one letter, one number and one special character";
        }
        break;
      case "confirmPassword":
        if (!value || value !== values.password) {
          error = "Password does not match";
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
    console.log(error, '<<<error')
  };




  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    // setStepStatus({ ...stepStatus, [step]: "finish" });
    validate(name, value);
  }

  const handleBlur = (e) => {
    const { name, value } = e.target;
    // console.log('touched');
    setIsTouched({ ...isTouched, [name]: true });
    validate(name, value);
  }


  useEffect(() => {
    // console.log(Object.values(isValid).every((value) => value === true), 'isTouched');
    let Valid = true;
    let Touched = Object.values(isTouched).every((value) => value === true);
    let keys = Object.keys(isTouched);
    keys.forEach((key) => {
      if (isValid[key] === false) {
        Valid = false;
      }
    });
    Valid ? setStepStatus({ ...stepStatus, [step]: "finish" }) : Touched ? setStepStatus({ ...stepStatus, [step]: "error" }) : setStepStatus({ ...stepStatus, [step]: "process" });
  }, [values]);




  return (
    <>
      <Form.Item
        name="firstName"
        validateStatus={
          errors.firstName && isTouched.firstName ? "error" : isTouched.firstName ? "success" : ""
        }
        help={errors.firstName && isTouched.firstName ? errors.firstName : null}
        onBlur={handleBlur}
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
          errors.lastName && isTouched.lastName ? "error" : isTouched.lastName ? "success" : ""
        }
        help={errors.lastName && isTouched.lastName ? errors.lastName : null}
        onBlur={handleBlur}
        hasFeedback
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="lastName"
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item
        name="email"
        validateStatus={
          errors.email && isTouched.email ? "error" : isTouched.email ? "success" : ""
        }
        help={errors.email && isTouched.email ? errors.email : null}
        onBlur={handleBlur}
        hasFeedback
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item
        name="password"
        validateStatus={
          errors.password && isTouched.password ? "error" : isTouched.password ? "success" : ""
        }
        help={errors.password && isTouched.password ? errors.password : null}
        onBlur={handleBlur}
        hasFeedback
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
        name="confirmPassword"
        validateStatus={
          errors.confirmPassword && isTouched.confirmPassword
            ? "error"
            : isTouched.confirmPassword
              ? "success"
              : ""
        }
        help={
          errors.confirmPassword && isTouched.confirmPassword
            ? errors.confirmPassword
            : null
        }
        onBlur={handleBlur}
        hasFeedback
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
    </>
  );
};

export default FormUserInfoComponent;
