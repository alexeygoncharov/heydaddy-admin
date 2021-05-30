import React, {Component, Fragment} from "react";
import {Button, Card, CardBody, CardTitle, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import {Colxx, Separator} from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import ApiCall from '../../../config/network';
import Url from '../../../config/api';
import {NotificationManager} from "../../../components/common/react-notifications";
import {config} from "../../../config/env";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import Select from "react-select";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {Link} from "react-router-dom";

const initialState = {
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    roles: [],
    selectedRoles: [],
    loading: false
}

export default class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    };
    componentDidMount() {
        this.getAllRoles();
        // this.getCountriesList();
    };

    // getCountriesList = async () => {
    //     this.setState({spinning: true})
    //     let response = await ApiCall.get(Url.ALL_COUNTRIES, {});
    //     if(response.status === 200){
    //         this.setState({
    //             countries: response.data.countries,
    //             spinning: false
    //         })
    //     }
    //     // console.log(response)
    // };

    createUser = async (e)=> {
        e.preventDefault();
        const {name, email, password, phone} = this.state;
        let validation = this.handleValidations();
        if(validation.status){
            let userSelectedRoles = this.state.selectedRoles.map( (item) => {
                return item.value
            });
            this.setState({loading: true});
                this.setState({ loading: true });
                let response = await ApiCall.post(Url.USER_STORE, {
                    name: name,
                    email: email,
                    password: password,
                    phoneNumber: phone,
                    roles: userSelectedRoles,
                }, await config())
                if(response.status === 200){
                    this.props.history.push('/app/users/view');
                    return  NotificationManager.success(
                        "User Created Successfully",
                        "Success",
                        3000,
                        null,
                        null,
                        'filled'
                    );
                }else {
                    this.setState({ loading: false });
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
    handleSelectedRoles = selectedRoles => {
        this.setState({selectedRoles });
    };

    getAllRoles = async ()=> {
        this.setState({spinning: true});
        let response = await ApiCall.get(Url.GET_ALL_ROLES, await config())
        // return console.log(response)
        if(response.status=== 200){
            let options = response.data.roles.map(function (item) {
                return {
                    value: item._id,
                    label: item.name,
                    key: item._id,
                    permissions: item.permissions,
                    createdAt: item.createdAt ,
                    updatedAt: item.updatedAt ,
                };
            })
            // console.log(options)
            this.setState({roles: options, spinning: false});
        }
    };
    handleValidations =  () => {
        let fNameValidation = {
            message: "Name Is Required",
            status: false
        };
        let emailValidation = {
            message: 'User Email Is Required',
            status: false
        };
        let phoneValidation = {
            message: 'User Phone Is Required',
            status: false
        };
        let dobValidation = {
            message: 'User Date of Birth Is Required',
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
        let roleValidation = {
            message: 'Please assign at least one Role',
            status: false
        };

        let passed = {
            status: true
        }
        return this.state.name !== ""?
            this.state.email === ""? emailValidation :
                this.state.phone === ""? phoneValidation :
                    this.state.dob === ""? dobValidation :
                        this.state.password === ""? passwordValidation :
                            this.state.confirmPassword === ""? confirmPasswordValidation :
                                this.state.password.length <8? passwordLength :
                                    this.state.password !== this.state.confirmPassword? passwordEquality :
            this.state.selectedRoles.length === 0?
                roleValidation :
                passed :
            fNameValidation
    };


    render() {
        const { phone, email, password, confirmPassword, selectedRoles, roles, name, spinning} = this.state;
        return (
            <Fragment>
                <Row>
                    <Colxx xxs="12">
                        <div className="text-zero top-right-button-container">
                            <Link to='/app/users/view'><Button size='lg' color={'secondary'}><IntlMessages id={"menu.cancel"} /></Button></Link>
                        </div>
                        <Breadcrumb heading="user.create" match={this.props.match} />
                        <Separator className="mb-5" />
                    </Colxx>
                </Row>
                {spinning? <div className='loading' />
                :
                    <Row>
                        <Col xxs="10">
                            <div className='col-sm-12 col-lg-10 col-xs-12 '>
                                <Card>
                                    <div className="position-absolute card-top-buttons">
                                    </div>
                                    <CardBody>
                                        <CardTitle>
                                            <IntlMessages id="user.create-user" />
                                        </CardTitle>
                                        <Form className="dashboard-quick-post" onSubmit={this.createUser}>
                                            <FormGroup row>
                                                <Label sm="3">
                                                    <IntlMessages id="user.name" />
                                                </Label>
                                                <Colxx sm="9">
                                                    <Input type="text" value={name} onChange={this.handleInputChange} name="name" placeholder={'Name *'} required/>
                                                </Colxx>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label sm="3">
                                                    <IntlMessages id="user.email" />
                                                </Label>
                                                <Colxx sm="9">
                                                    <Input type="email" value={email} onChange={this.handleInputChange} name="email" placeholder={'Email *'} required/>
                                                </Colxx>
                                            </FormGroup>

                                            <FormGroup row>
                                                <Label sm="3">
                                                    <IntlMessages id="user.phone" />
                                                </Label>
                                                <Colxx sm="9">
                                                    <Input type="text" value={phone} onChange={this.handleInputChange} name="phone" placeholder={'Phone Number *'} required/>
                                                </Colxx>
                                            </FormGroup>

                                            <FormGroup row>
                                                <Label sm="3">
                                                    <IntlMessages id="user.roles" />
                                                </Label>
                                                <Colxx sm="9">
                                                    <Select
                                                        components={{ Input: CustomSelectInput }}
                                                        className="react-select"
                                                        classNamePrefix="react-select"
                                                        placeholder="Select Roles *"
                                                        isMulti
                                                        name="selectedRoles"
                                                        value={selectedRoles}
                                                        onChange={this.handleSelectedRoles}
                                                        options={roles}
                                                    />
                                                </Colxx>
                                            </FormGroup>


                                            <FormGroup row>
                                                <Label sm="3">
                                                    <IntlMessages id="user.password" />
                                                </Label>
                                                <Colxx sm="9">
                                                    <Input type="password" value={password} onChange={this.handleInputChange} name="password" placeholder={'Password *'} required/>
                                                </Colxx>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label sm="3">
                                                    <IntlMessages id="user.confirm-password" />
                                                </Label>
                                                <Colxx sm="9">
                                                    <Input type="password" value={confirmPassword} onChange={this.handleInputChange} name="confirmPassword" placeholder={'Confirm Password *'} required/>
                                                </Colxx>
                                            </FormGroup>

                                            <Button className={`float-right btn-shadow btn-multiple-state ${this.state.loading ? "show-spinner" : ""}`} color="primary">
                                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                                                <span className="label"><IntlMessages id="user.create" /></span>
                                            </Button>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </div>
                        </Col>

                    </Row>
                }
            </Fragment>
        )
    }
}
