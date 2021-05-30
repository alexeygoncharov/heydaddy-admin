import React, {Component, Fragment} from "react";
import {Button, Card, CardBody, CardTitle, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";
import {Colxx, Separator} from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import ApiCall from '../../config/network';
import Url from '../../config/api';
import {NotificationManager} from "../../components/common/react-notifications";
import {config} from "../../config/env";

const initialState = {
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    oldPassword: '',
    loading: false
}

export default class AdminProfile extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    };
    componentDidMount() {
        this.setState({
            email: JSON.parse(localStorage.currentUser).email
        })
    }

    updateProfile = async (e)=> {
        e.preventDefault();
        const { password, oldPassword} = this.state;
            let validation = this.handleValidations();
            if(validation.status){
                this.setState({loading: true})
                let response = await ApiCall.post(Url.UPDATE_ADMIN_PASSWORD, {
                    password: oldPassword, newPassword: password
                }, await config());
                if(response.status === 200){
                    this.setState({
                        loading: false,
                        password: '',
                        confirmPassword: '',
                        oldPassword: '',
                    })
                    return  NotificationManager.success(
                        "Password Changed Successfully",
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
                // console.log(validation)
                return  NotificationManager.error(validation.message, "Error", 3000, null, null, 'filled');
            }


    };
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleValidations =  () => {
        let oldPasswordValidation = {
            message: 'Old Password Is Required',
            status: false
        };
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
        return this.state.oldPassword !== ""?
                this.state.password === ""? passwordValidation :
                    this.state.confirmPassword === ""? confirmPasswordValidation :
                        this.state.password.length <8? passwordLength :
                            this.state.password !== this.state.confirmPassword? passwordEquality :
                                passed :
        oldPasswordValidation
    };
    goBack=()=>{
        this.props.history.goBack();
    };
    render() {
        const {email, password, oldPassword, confirmPassword} = this.state;
        return (
            <Fragment>
                <Row>
                    <Colxx xxs="12">
                        <div className="text-zero top-right-button-container">
                            <Button size='lg' color={'secondary'} onClick={this.goBack}>Go Back</Button>
                        </div>
                        <Breadcrumb heading="profile" match={this.props.match} />
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
                                        <IntlMessages id="updateProfile" />
                                    </CardTitle>
                                    <Form className="dashboard-quick-post" onSubmit={this.updateProfile}>

                                        <FormGroup row>
                                            <Label sm="3">
                                                <IntlMessages id="email" />
                                            </Label>
                                            <Colxx sm="9">
                                                <Input type="email" disabled value={email} onChange={this.handleInputChange} name="email" placeholder={'Email *'} required/>
                                            </Colxx>
                                        </FormGroup>

                                        <FormGroup row>
                                            <Label sm="3">
                                                <IntlMessages id="oldPassword" />
                                            </Label>
                                            <Colxx sm="9">
                                                <Input type="password" value={oldPassword} onChange={this.handleInputChange} name="oldPassword" placeholder={'Old Password *'} />
                                            </Colxx>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label sm="3">
                                                <IntlMessages id="password" />
                                            </Label>
                                            <Colxx sm="9">
                                                <Input type="password" value={password} onChange={this.handleInputChange} name="password" placeholder={'Password *'} />
                                            </Colxx>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label sm="3">
                                                <IntlMessages id="confirmPassword" />
                                            </Label>
                                            <Colxx sm="9">
                                                <Input type="password" value={confirmPassword} onChange={this.handleInputChange} name="confirmPassword" placeholder={'Confirm Password *'} />
                                            </Colxx>
                                        </FormGroup>

                                        <Button className={`float-right btn-shadow btn-multiple-state ${this.state.loading ? "show-spinner" : ""}`} color="primary">
                                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                                            <span className="label"><IntlMessages id="create" /></span>
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
