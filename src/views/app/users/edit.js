import React, {Component, Fragment} from "react";
import {Button, Card, CardBody, CardTitle, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import {Colxx, Separator} from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import ApiCall from '../../../config/network';
import Url from '../../../config/api';
import {NotificationManager} from "../../../components/common/react-notifications";
import {config} from "../../../config/env";
import {Link} from "react-router-dom";

const initialState = {
    name: "",
    // phone: "",
    email: '',
    password: '',
    id: null,
    confirmPassword: '',
    loading: false
}

export default class UpdateUser extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    };
    componentDidMount() {
        this.getSingleUserData();
    }
    getSingleUserData = async () => {
        let response = await ApiCall.get(`${Url.USER_EDIT}/${this.props.match.params.id}`, await config());
        if(response.status === 200){
            // console.log(response)
            this.setState({
            name: response.data.user.name,
                // phone: response.data.user.phoneNumber,
                email: response.data.user.email,
                id: response.data.user.id
            })
        }
    }


    updateUser = async (e)=> {
        e.preventDefault();
        const {name, email, password,
            // phone,
            id} = this.state;
        let validation = this.handleValidations();
        if(validation.status){
            if(password === ""){
                this.setState({loading: true})
                let response = await ApiCall.post(Url.USER_UPDATE, {
                    name, email,
                    // phone_number: phone,
                    id
                }, await config());
                if(response.status === 200){
                    this.setState({
                        loading: false
                    })
                    this.props.history.push('/app/users/view')
                    return  NotificationManager.success(
                        "User Updated Successfully",
                        "Success",
                        3000,
                        null,
                        null,
                        'filled');

                }else {
                    this.setState({
                        loading: false
                    })
                }
            }else {
                let passValidation = this.passwordValidations();
                if(passValidation.status){
                    this.setState({loading: true})
                    let response = await ApiCall.post(Url.USER_UPDATE, {
                        name, email, password,
                        // phone_number: phone,
                        id
                    }, await config());
                    if(response.status === 200){
                        this.setState({
                            loading: false
                        })
                        this.props.history.push('/app/users/view')
                        return  NotificationManager.success(
                            "User Updated Successfully",
                            "Success",
                            3000,
                            null,
                            null,
                            'filled');

                    }else {
                        this.setState({
                            loading: false
                        })
                    }
                }else {
                    return  NotificationManager.error(passValidation.message, "Error", 3000, null, null, 'filled');
                }

            }

        }else {
            // console.log(validation)
            return  NotificationManager.error(validation.message, "Error", 3000, null, null, 'filled');
        }

    };
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    passwordValidations =  () => {
        let passwordValidation = {
            message: 'User Password Is Required',
            status: false
        };
        let confirmPasswordValidation = {
            message: 'User Confirm Password Is Required',
            status: false
        };
        let passwordLength = {
            message: 'Password Must Be Greater Than 8 characters',
            status: false
        };
        let passwordEquality = {
            message: 'Password & Confirm Password Does Not Match',
            status: false
        };

        let passed = {
            status: true
        }
        return this.state.password !== ""?
                    this.state.confirmPassword === ""? confirmPasswordValidation :
                        this.state.password.length <8? passwordLength :
                            this.state.password !== this.state.confirmPassword? passwordEquality :
                                passed :
            passwordValidation
    };
    handleValidations =  () => {
        let nameValidation = {
            message: "Name Is Required",
            status: false
        };

        let emailValidation = {
            message: 'Email Is Required',
            status: false
        };
        let phoneValidation = {
            message: 'Date Of Birth Is Required',
            status: false
        };
        let passed = {
            status: true
        }
        return this.state.name !== ""?
            this.state.email === ""? emailValidation :
                this.state.phone === ""? phoneValidation :
                                    passed :
            nameValidation
    };

    render() {
        const {name, email, password,
            // phone,
            confirmPassword} = this.state;
        return (
            <Fragment>
                <Row>
                    <Colxx xxs="12">
                        <div className="text-zero top-right-button-container">
                            <Link to='/app/users/view'><Button size='lg' color={'secondary'}>Cancel</Button></Link>
                        </div>
                        <Breadcrumb heading="edit" match={this.props.match} />
                        <Separator className="mb-5" />
                    </Colxx>
                </Row>
                <Row>
                    <Col xxs="10">
                        <div className='col-sm-12 col-lg-10 col-xs-12 '>
                            <Card>
                                <div className="position-absolute card-top-buttons">
                                </div>
                                <CardBody>
                                    <CardTitle>
                                        <IntlMessages id="updateUser" />
                                    </CardTitle>
                                    <Form className="dashboard-quick-post" onSubmit={this.updateUser}>
                                        <FormGroup row>
                                            <Label sm="3">
                                                <IntlMessages id="name" />
                                            </Label>
                                            <Colxx sm="9">
                                                <Input type="text" value={name} onChange={this.handleInputChange} name="name" placeholder={'Name *'} required/>
                                            </Colxx>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label sm="3">
                                                <IntlMessages id="email" />
                                            </Label>
                                            <Colxx sm="9">
                                                <Input type="email" value={email} onChange={this.handleInputChange} name="email" placeholder={'Email *'} required/>
                                            </Colxx>
                                        </FormGroup>
                                        {/*<FormGroup row>*/}
                                        {/*    <Label sm="3">*/}
                                        {/*        <IntlMessages id="phone" />*/}
                                        {/*    </Label>*/}
                                        {/*    <Colxx sm="9">*/}
                                        {/*        <Input type="text" value={phone} onChange={this.handleInputChange} name="phone" placeholder={'Phone *'} required/>*/}
                                        {/*    </Colxx>*/}
                                        {/*</FormGroup>*/}

                                        <FormGroup row>
                                            <Label sm="3">
                                                <IntlMessages id="password" />
                                            </Label>
                                            <Colxx sm="9">
                                                <Input type="password" value={password} onChange={this.handleInputChange} name="password" placeholder={'Password'} />
                                            </Colxx>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label sm="3">
                                                <IntlMessages id="confirmPassword" />
                                            </Label>
                                            <Colxx sm="9">
                                                <Input type="password" value={confirmPassword} onChange={this.handleInputChange} name="confirmPassword" placeholder={'Confirm Password'} />
                                            </Colxx>
                                        </FormGroup>

                                        <Button className={`float-right btn-shadow btn-multiple-state ${this.state.loading ? "show-spinner" : ""}`} color="primary">
                                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                                            <span className="label"><IntlMessages id="update" /></span>
                                        </Button>
                                    </Form>
                                </CardBody>
                            </Card>
                        </div>
                    </Col>

                </Row>

            </Fragment>
        )
    }
}
