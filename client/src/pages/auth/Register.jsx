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

import FormInfo from "./FormUserInfo";
import FormDetail from "./FormUseDetail";

const { Option } = Select;

function RegisterPage(props) {
  const [step, setStep] = useState(0);
  // wait process finish error
  const [stepStatus, setStepStatus] = useState({
    0: "process",
    1: "process",
    2: "process",
    3: "process",
  });

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gander: "",
    phoneNumber: "",
    birthDay: "",
    coutry: "",
    city: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gander: "",
    phoneNumber: "",
    birthDay: "",
    coutry: "",
    city: ""
  })

  const nextStep = () => {
    if (step < Object.keys(stepStatus).length - 1) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  useEffect(() => {
    // console.log(values.email, 'test')
  }, [values.email])

  return (
    <Container>
      <Steps
        current={step}
        status={stepStatus[step]}
      >
        <Steps.Step title="Info" icon={<FileTextOutlined />} />
        <Steps.Step title="Details" icon={<IdcardOutlined />} />
        <Steps.Step title="Verify" icon={<SolutionOutlined />} />
        <Steps.Step title="Complete" icon={<FileDoneOutlined />} />
      </Steps>
      <Card className="mt-5">
        <Card.Header>
          <h2>Register</h2>
        </Card.Header>
        <Card.Body>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ values }}
          >
            {/* Form user info */}
            {step === 0 && <FormInfo values={values} setValues={setValues} errors={errors} setErrors={setErrors} step={step} stepStatus={stepStatus} setStepStatus={setStepStatus} />}
            {/* Form user detail */}
            {step === 1 && <FormDetail values={values} setValues={setValues} errors={errors} setErrors={setErrors} step={step} stepStatus={stepStatus} setStepStatus={setStepStatus} />}
          </Form>
        </Card.Body>
        <Card.Footer className=" ">
          <Row>
            <Col className="d-flex justify-content-start">
              <Button type="primary" onClick={prevStep} hidden={step === 0}>
                Previous
              </Button>
            </Col>
            <Col className="d-flex justify-content-end">
              <Button
                className=""
                type="primary"
                onClick={nextStep}
                disabled={stepStatus[step] === "finish" ? false : true}
                hidden={Object.keys(stepStatus).length - 1 === step}
              >
                Next
              </Button>
            </Col>
          </Row>
        </Card.Footer>
        <Card.Footer className="d-flex justify-content-between">
          {/* <Col className="justify-content-start"> */}
          <Link to="/login">Login</Link>
          {/* </Col> */}
          {/* <Col className="justify-content-end"> */}
          <Link to="/forgot-password">Forgot password</Link>
          {/* </Col> */}
        </Card.Footer>
      </Card>
    </Container>
  );
}

const mapStateToProps = ({ auth }) => {
  return {
    isAthenticated: auth.isAuthenticated,
    error: auth.error,
  };
};

const Register = connect(mapStateToProps, { register })(RegisterPage);

export { Register };
