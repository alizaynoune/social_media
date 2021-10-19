import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Checkbox, Typography, Select, DatePicker, Steps } from 'antd';
import { UserOutlined, LockOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined, IdcardOutlined, FileTextOutlined, FileDoneOutlined } from '@ant-design/icons';
import { Container, Card, Alert, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../actions';
import 'antd/dist/antd.css';

const { Option } = Select;


function RegisterPage(props) {
    const [step, setStep] = useState(0);
    const [stepValid, setStepValid] = useState({
        0: true,
        1: true,
        2: true,
        3: false
    });

    const [stepFinish, setStepFinish] = useState({
        0: false,
        1: true,
        2: false,
        3: false
    });

    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        gander: '',
        phoneNumber: '',
        birthDay: '',
        coutry: '',
        city: '',
    });


    const nextStep = () => {
        // step < 3 ? setStep(step + 1) : null;
        if (step < (Object.keys(stepValid).length - 1)) {
            setStep(step + 1);
        }
    }

    const prevStep = () => {
        // step > 0 ? setStep(step - 1) : null;
        if (step > 0) {
            setStep(step - 1);
        }
    }


    return (
        <Container>
            <Steps current={step} status={!stepValid[step] ? 'error' : stepFinish[step] ? 'finish' : 'process'}>
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
                    <Card.Text>
                        test
                    </Card.Text>
                </Card.Body>
                <Card.Footer className=" ">
                    <Row>
                        <Col className="d-flex justify-content-start">
                            <Button type="primary" onClick={prevStep} hidden={step === 0}>
                                Previous
                            </Button>
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <Button className="" type="primary" onClick={nextStep} disabled={!stepValid[step] && !stepFinish[step]} hidden={(Object.keys(stepValid).length - 1) === step}>
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
    )
}

const mapStateToProps = ({ auth }) => {
    return {
        isAthenticated: auth.isAuthenticated,
        error: auth.error
    }
}

const Register = connect(mapStateToProps, { register })(RegisterPage);

export { Register };
