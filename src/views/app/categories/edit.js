import React, {Component, Fragment} from "react";
import {Button, Card, CardBody, CardTitle, Col, CustomInput, Form, FormGroup, Input, Label, Row} from "reactstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import {Colxx, Separator} from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import ApiCall from "../../../config/network";
import Url from "../../../config/api";
import {config} from "../../../config/env";
import {NotificationManager} from "../../../components/common/react-notifications";
import {Link} from "react-router-dom";
import DropzoneExample from "../../../containers/forms/DropzoneExample";

const initialState = {
    name: '',
    id: null,
    imageUrl: "",
    image: '',
    isFeatured: false,
    description: false,
    loading: false,
    spinning: false
}
export default class UpdateCategory extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        this._isMounted = false
        this.getSingleCategoryData();
    }
    componentWillUnmount() {
        this._isMounted = true
    }
    getSingleCategoryData = async () => {
        this.setState({spinning: true});
        let response = await ApiCall.get(`${Url.EDIT_CATEGORY}/${this.props.match.params.slug}`, await config());
        // return console.log(response)
        if (response.status === 200) {
            if(!this._isMounted){
                this.setState({
                    name: response.data.category.name,
                    id: response.data.category._id,
                    imageUrl: response.data.category.image,
                    description: response.data.category.description,
                    isFeatured: response.data.category.featured,
                    spinning: false
                });
            }

        }
    }
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };


    updateCategory = async (e) => {
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
        data.append('image', image === ""? null : image);
            let response = await ApiCall.post(`${Url.UPDATE_CATEGORY}/${this.props.match.params.slug}`, data, await config());
            if (response.status === 200) {
                this.setState(initialState);
                this.props.history.push('/app/categories/view')
                return NotificationManager.success(
                    "Category Updated Successfully",
                    "Success",
                    3000,
                    null,
                    null,
                    'filled'
                );
            } else {
                this.setState({loading: false});
            }

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
        const { name, description, isFeatured, imageUrl, spinning } = this.state;
        return (
            <Fragment>
                <Row>
                    <Colxx xxs="12">
                        <div className="text-zero top-right-button-container">
                            <Link to='/app/categories/view'><Button size='lg' color={'secondary'}><IntlMessages id={"menu.cancel"} /></Button></Link>
                        </div>
                        <Breadcrumb heading="category.edit" match={this.props.match}/>
                        <Separator className="mb-5"/>
                    </Colxx>
                </Row>
                <Row>
                    <Col xxs="10">
                        <div className='col-sm-12 col-lg-10 col-xs-12 '>
                        {spinning ? <div className="loading"/> :
                            <Card>
                                <div className="position-absolute card-top-buttons">
                                </div>
                                <CardBody>
                                    <CardTitle>
                                        <IntlMessages id="category.update"/>
                                    </CardTitle>
                                    <Form className="dashboard-quick-post" onSubmit={this.updateCategory}>
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
                                                    url={imageUrl}
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
                                        <Button
                                            className={`float-right btn-shadow btn-multiple-state ${this.state.loading ? "show-spinner" : ""}`}
                                            color="primary" disabled={this.state.loading}>
                                        <span className="spinner d-inline-block"><span className="bounce1"/><span className="bounce2"/><span className="bounce3"/></span>
                                            <span className="label"><IntlMessages id="category.update"/></span>
                                        </Button>
                                    </Form>
                                </CardBody>
                            </Card>
                        }
                        </div>
                    </Col>

                </Row>
            </Fragment>
        )
    }
}
