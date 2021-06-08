import React, { Component, Fragment } from "react";
import { Row, Col } from "reactstrap";
import {
    Card,
    CardBody,
    CardTitle,
    FormGroup,
    Label,
    Button,
    Form,
    Input
} from "reactstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import ApiCall from '../../../config/network';
import Url from '../../../config/api';
import { NotificationManager } from "../../../components/common/react-notifications";
import {config, multipartConfig} from "../../../config/env";
import {Link} from "react-router-dom";
import DropzoneExample from "../../../containers/forms/DropzoneExample";
import Select from "react-select";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import SelectComponent from "../../../components/SelectComponent";
const initialState = {
    name: '',
    loading: false,  title: '',
    description: '',
    categories: [],
    selectedCategory: '',
    selectedMainCategory: [],
    mainCategory: [],
    image: "",
    roadClosure: false,
    isFeatured: false,
    status: true,
    isLoading: false,
    statusProvince: true, isLoadingProvince: false,
    statusCountry: true, isLoadingCountry: false,
    statusCity: true,
    isLoadingCity: false,
    location: '',
    provinces: [],
    selectedCountry:'',
    countries:[],
    cities: [],
    selectedProvince: '',
    selectedCity: '',
    selectedRiskLevel: '',
    spinning: false,
    target: '',
    dropCountry: '',
    pricePerDay: '',
    age: '',
    national: '',
    services: [],
    languages: [],
    selectedServices: [],
    selectedLanguages: [],
}
export default class CreateLanguage extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    };

    componentDidMount() {
        this._isMounted = false;
        this.getAllDataOnCreation();
        this.getAllServices();
        this.getAllLanguages();
    }


    getAllServices = async ()=> {
        let response = await ApiCall.get(Url.GET_ALL_SERVICES, await config())
        if(response.status=== 200){
            let options = response.data.services.map(function (item) {
                return {
                    value: item._id,
                    label: item.name,
                    key: item._id
                };
            })
            // console.log(options)
            this.setState({services: options});
        }
    };

    getAllLanguages = async ()=> {
        let response = await ApiCall.get(Url.GET_ALL_LANGUAGES, await config())
        if(response.status=== 200){
            let options = response.data.languages.map(function (item) {
                return {
                    value: item._id,
                    label: item.name,
                    key: item._id
                };
            })
            // console.log(options)
            this.setState({languages: options});
        }
    };

    handleSelectedLanguages = selectedLanguages => {
        this.setState({selectedLanguages });
    };

    handleSelectedServices = selectedServices => {
        this.setState({selectedServices });
    };

    componentWillUnmount() {
        this._isMounted = true
    }

    getAllDataOnCreation = async () => {
        if (!this._isMounted) {
            let responseCountries = await ApiCall.get(Url.ALL_COUNTRIES_OPEN, await config())
            if (responseCountries.status === 200) {
                this.setState({countries: responseCountries.data.countries});
            }
        }

    };

    handleValidations =  () => {
        let imageValidation = {
            message: 'Please Select image for profile',
            status: false,
        };
        let nationalValidation = {
            message: 'Please Select image for National id',
            status: false,
        };
        let nameValidation = {
            message: "Name Is Required",
            status: false
        };
        let emailValidation = {
            message: 'User Email Is Required',
            status: false
        };

        let ageValidation = {
            message: 'Age is Required',
            status: false
        };
        let priceperdayValidation = {
            message: 'Price Per Day is Required',
            status: false
        };
        let passwordValidation = {
            message: 'User Password Is Required',
            status: false
        };

        let passwordLength = {
            message: 'Password Must Be Greater Than 8 characters',
            status: false
        };
        let designationValidation = {
            message: "Designation Is Required",
            status: false
        };

        let passed = {
            status: true
        }
        return this.state.name !== ""?
            this.state.email === ""? emailValidation :
                this.state.designation === ""? designationValidation :
                    this.state.pricePerDay === ""? priceperdayValidation :
                        this.state.age === ""? ageValidation :
                            this.state.password === ""? passwordValidation :
                                this.state.password.length <8? passwordLength :
                                    this.state.image === ""? imageValidation :
                                      this.state.national === ""? nationalValidation :
                                        passed :
            nameValidation
    };

    createPermission = async (e)=> {
        e.preventDefault();
        const {name, age, email, password, pricePerDay, image,
            selectedCity,
            selectedCountry,
            selectedProvince, national} = this.state;

        let userSelectedLanguages = this.state.selectedLanguages.map(function (item) {
            return item.value
        });
        let userSelectedServices = this.state.selectedServices.map(function (item) {
            return item.value
        });
        let validation = this.handleValidations();
        if(validation.status){
            this.setState({loading: true});
            const data = new FormData();
            data.append('name', name);
            data.append('email', email);
            data.append('password', password);
            data.append('languages', JSON.stringify(userSelectedLanguages));
            data.append('services', JSON.stringify(userSelectedServices));
            data.append('country', JSON.stringify(selectedCountry));
            data.append('state', JSON.stringify(selectedProvince));
            data.append('city', JSON.stringify(selectedCity));
            data.append('pricePerDay', pricePerDay);
            data.append('age', age);
            data.append('profile', image);
            data.append('nationalId', national);
            let response = await ApiCall.post(Url.MODEL_STORE, data, await multipartConfig());
            if(response.status === 200){
                this.props.history.push('/app/model/view');
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
                return  NotificationManager.error(response.e.data.message, "Error", 3000, null, null, 'filled');
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


    handleChangeImage  = (file) => {
        this.setState({
            image: file
        })
    }
    removeImage = (file) => {
        if(file){
            this.setState({
                image: ""
            })
        }
    }

    handleChangeNational  = (file) => {
        this.setState({
            national: file
        })
    }
    removeNational = (file) => {
        if(file){
            this.setState({
                national: ""
            })
        }
    }
    handleChangeCountry = async(selectedCountry) => {

        this.setState({ selectedProvince: "" })
        this.setState({ dropCountry: selectedCountry.value })
        this.setState({ selectedCity: "" })
        this.setState({ statusCountry: true })
        this.setState({ statusCity: true })
        this.setState({ selectedCountry })
        this.setState({
            isLoadingCountry: true
        });
        if(selectedCountry.length === 0) {
            this.setState({ statusCountry: false, isLoadingCountry: false });
            return null
        }

        const id = selectedCountry.value;

        let response = await ApiCall.get(`${Url.ALL_PROVINCES}/${id}`, await config());
        if (response.status === 200) {
            if(!this._isMounted){
                this.setState({
                    provinces: response.data.states,
                    statusCountry: false,
                    isLoadingCountry: false
                });
            }
        }
    }
    handleChangeProvince = async(selectedProvince) => {

        this.setState({ statusCity: true })
        this.setState({ selectedCity: "" })
        this.setState({ selectedProvince })
        this.setState({
            isLoadingCity: true
        });
        if(selectedProvince.length === 0) {
            this.setState({ statusCity: false, isLoadingCity: false });
            return null
        }

        const id = selectedProvince.value;

        let response = await ApiCall.get(`${Url.ALL_CITIES}/${this.state.dropCountry}/${id}`, await config());
        if (response.status === 200) {
            if(!this._isMounted){
                this.setState({
                    cities: response.data.cities,
                    statusCity: false,
                    isLoadingCity: false
                });
            }
        }
    }

    handleChangeCity = (selectedCity) => {
        this.setState({ selectedCity })
    };

    render() {
        const {name, email, password, pricePerDay, age,
            statusCity,
            isLoadingCity,
            statusCountry,
            isLoadingCountry,
            provinces,
            cities,
            selectedCity,
            selectedCountry,
            selectedProvince,
            countries} = this.state;
        return (
            <Fragment>
                <Row>
                    <Colxx xxs="12">
                        <div className="text-zero top-right-button-container">
                            <Link to='/app/model/view'><Button size='lg' color={'secondary'}>Cancel</Button></Link>
                        </div>
                        <Breadcrumb heading="menu.create" match={this.props.match} />
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
                                    <IntlMessages id="create" />
                                </CardTitle>
                                <Form className="dashboard-quick-post" onSubmit={this.createPermission}>
                                    <FormGroup row>
                                        <Label sm="3">
                                            <IntlMessages id="user.name" /> *
                                        </Label>
                                        <Colxx sm="9">
                                            <Input type="text" value={name} onChange={this.handleInputChange} name="name" placeholder={'Name *'}/>
                                        </Colxx>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label sm="3">
                                            Email
                                        </Label>
                                        <Colxx sm="9">
                                            <Input type="email" value={email} onChange={this.handleInputChange} name="email" placeholder={'Email *'}/>
                                        </Colxx>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label sm="3">
                                            <IntlMessages id="user.password" /> *
                                        </Label>
                                        <Colxx sm="9">
                                            <Input type="password" value={password} onChange={this.handleInputChange} name="password" placeholder={'Password *'}/>
                                        </Colxx>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label sm="3">
                                            <IntlMessages id="Age" /> *
                                        </Label>
                                        <Colxx sm="9">
                                            <Input type="number" value={age} onChange={this.handleInputChange} name="age" placeholder={'Age *'}/>
                                        </Colxx>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label sm="3">
                                            <IntlMessages id="Price Per Day" /> *
                                        </Label>
                                        <Colxx sm="9">
                                            <Input type="number" value={pricePerDay} onChange={this.handleInputChange} name="pricePerDay" placeholder={'Price Per Day *'}/>
                                        </Colxx>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label sm="3">
                                            Services
                                        </Label>
                                        <Colxx sm="9">
                                            <Select
                                                components={{ Input: CustomSelectInput }}
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                placeholder="Select Service..."
                                                isMulti
                                                name="selectedPermissions"
                                                value={this.state.selectedServices}
                                                onChange={this.handleSelectedServices}
                                                options={this.state.services}
                                            />
                                        </Colxx>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label sm="3">
                                           Languages
                                        </Label>
                                        <Colxx sm="9">
                                            <Select
                                                components={{ Input: CustomSelectInput }}
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                placeholder="Select Language..."
                                                isMulti
                                                name="selectedPermissions"
                                                value={this.state.selectedLanguages}
                                                onChange={this.handleSelectedLanguages}
                                                options={this.state.languages}
                                            />
                                        </Colxx>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label sm="3">
                                            Select Country *
                                        </Label>
                                        <Colxx sm="9">
                                            <Select
                                                components={{ Input: CustomSelectInput }}
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                placeHoleder={'Please Select Event Category'}
                                                name="form-field-name"
                                                value={selectedCountry}
                                                onChange={this.handleChangeCountry}
                                                options={countries.map(item => {
                                                    return {label: item.name, value: item.iso2, key: item.iso2}
                                                })}
                                            />
                                        </Colxx>
                                    </FormGroup>

                                    {/*//provinces*/}

                                    <FormGroup row>
                                        <Label sm="3">
                                            Select State *
                                        </Label>
                                        <Colxx sm="9">
                                            <SelectComponent
                                                isLoading={isLoadingCountry}
                                                isDisabled={statusCountry}
                                                placeHoleder={'Please Select Country'}
                                                value={selectedProvince}
                                                onChange={this.handleChangeProvince}
                                                options={provinces.map(item => {
                                                    return {label: item.name, value: item.iso2, key: item.iso2}
                                                })}
                                            />
                                            {/*<Select*/}
                                            {/*    components={{ Input: CustomSelectInput }}*/}
                                            {/*    className="react-select"*/}
                                            {/*    classNamePrefix="react-select"*/}
                                            {/*    placeHoleder={'Please Select Event Category'}*/}
                                            {/*    name="form-field-name"*/}
                                            {/*    value={selectedProvince}*/}
                                            {/*    onChange={this.handleChangeProvince}*/}
                                            {/*    options={provinces.map(item => {*/}
                                            {/*        return {label: item.name, value: item._id, key: item._id}*/}
                                            {/*    })}*/}
                                            {/*/>*/}
                                        </Colxx>
                                    </FormGroup>

                                    {/*//cities*/}
                                    <FormGroup row>
                                        <Label sm="3">
                                            Select City *
                                            {/*<IntlMessages id="closed-Opened"/>**/}
                                        </Label>
                                        <Colxx sm="9">
                                            <SelectComponent
                                                isLoading={isLoadingCity}
                                                isDisabled={statusCity}
                                                placeHoleder={'Please Select City'}
                                                value={selectedCity}
                                                onChange={this.handleChangeCity}
                                                options={cities.map(item => {
                                                    return {label: item.name, value: item.id, key: item.id}
                                                })}
                                            />
                                        </Colxx>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label sm="3">
                                            Image *
                                        </Label>
                                        <Colxx sm="9">
                                            <DropzoneExample
                                                fileTypes="image/*"
                                                onChange={this.handleChangeImage}
                                                removeFile={this.removeImage}
                                            />
                                        </Colxx>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label sm="3">
                                            National Id *
                                        </Label>
                                        <Colxx sm="9">
                                            <DropzoneExample
                                                fileTypes="image/*"
                                                onChange={this.handleChangeNational}
                                                removeFile={this.removeNational}
                                            />
                                        </Colxx>
                                    </FormGroup>
                                    <Button  className={`float-right btn-shadow btn-multiple-state ${this.state.loading ? "show-spinner" : ""}`} color="primary" disabled={this.state.loading}>

                                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                                        <span className="label"><IntlMessages id="permission.create" /></span>
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
