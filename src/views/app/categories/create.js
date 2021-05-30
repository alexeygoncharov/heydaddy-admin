import React, {Component, Fragment} from "react";
import {Button, Card, CardBody, CardTitle, Col, CustomInput, Form, FormGroup, Input, Label, Row} from "reactstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import {Colxx, Separator} from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import ApiCall from '../../../config/network';
import Url from '../../../config/api';
import {NotificationManager} from "../../../components/common/react-notifications";
import {multipartConfig} from "../../../config/env";
import {Link} from "react-router-dom";
import DropzoneExample from "../../../containers/forms/DropzoneExample";

const initialState = {
    name: '',
    description: "",
    image: "",
    selectedType: '',
    isFeatured: false,
    loading: false
}
export default class CreateCategory extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    };

    createCategory = async (e)=> {
        e.preventDefault();
        const {name, description, isFeatured, image} = this.state;

            if(description.length <12){
                return  NotificationManager.error(
                    "Description must be longer than 10 characters",
                    "Error",
                    3000,
                    null,
                    null,
                    'filled'
                );
            }
        this.setState({loading: true});
            const data = new FormData();
            data.append('name', name);
            data.append('description', description);
            data.append('featured', isFeatured);
            data.append('image', image);
            let response = await ApiCall.post(Url.STORE_CATEGORY, data, await multipartConfig());
            if(response.status === 200){
                this.setState(initialState);
                this.props.history.push('/app/categories/view')
                return  NotificationManager.success(
                    "Category Stored Successfully",
                    "Success",
                    3000,
                    null,
                    null,
                    'filled'
                );
            }else {
                this.setState({loading: false});
            }

    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handleSelectTypeChange = (e) => {
        if (e.target.value !== 'null') {
            this.setState({selectedType: e.target.value})
        } else {
            this.setState({selectedType: ''})
        }
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

    handleAttributeChange = (e) => {
        this.setState({
            isFeatured: e.target.checked
        })
    }

    render() {
        const {name, description, isFeatured} = this.state;
        return (
            <Fragment>
                <Row>
                    <Colxx xxs="12">
                        <div className="text-zero top-right-button-container">
                            <Link to='/app/categories/view'><Button size='lg' color={'secondary'}><IntlMessages id={"menu.cancel"} /></Button></Link>
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
                                    <IntlMessages id="categories-create" />
                                </CardTitle>
                                <Form className="dashboard-quick-post" onSubmit={this.createCategory}>
                                    <FormGroup row>
                                        <Label sm="3">
                                            <IntlMessages id="name" />
                                        </Label>
                                        <Colxx sm="9">
                                            <Input type="text" value={name} onChange={this.handleInputChange} name="name" placeholder={'Name of category *'} required/>
                                        </Colxx>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label sm="3">
                                           Description
                                        </Label>
                                        <Colxx sm="9">
                                            <Input type="textarea" value={description} onChange={this.handleInputChange} name="description" placeholder={'Description *'} required/>
                                        </Colxx>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label sm="3">
                                            Image
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
                                            Featured
                                            {/*<IntlMessages id="guide.category"/>*/}
                                        </Label>
                                        <Colxx sm="9">
                                            <CustomInput
                                                type="checkbox"
                                                key={'featured'}
                                                name='isFeatured'
                                                checked={isFeatured}
                                                onChange={this.handleAttributeChange}
                                                id={'isFeatured'}
                                                label={'is Featured'}
                                            />
                                        </Colxx>
                                    </FormGroup>
                                    <Button className={`float-right btn-shadow btn-multiple-state ${this.state.loading ? "show-spinner" : ""}`} color="primary" disabled={this.state.loading}>
                                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                                        <span className="label"><IntlMessages id="categories-create" /></span>
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
