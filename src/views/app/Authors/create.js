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
    name: '',
    description: '',
    email: '',
    youtube: '',
    instagram: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    loading: false
}
export default class CreateAuthor extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    };

    createAuthor = async (e)=> {
        e.preventDefault();
        const {
            name,
            description,
            email,
            youtube,
            instagram,
            facebook,
            twitter,
            linkedin
        } = this.state;
            this.setState({loading: true});
            let response = await ApiCall.post(Url.STORE_AUTHOR, {
                name,
                description,
                email,
                social: {
                    youtube,
                    facebook,
                    linkedin,
                    instagram,
                    twitter
                }
            }, await config());
            if(response.status === 200){
                this.setState(initialState);
                this.props.history.push('/app/author/view')
                return  NotificationManager.success(
                    "Author Created Successfully",
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

    render() {
        const {
            name,
            description,
            email,
            youtube,
            instagram,
            facebook,
            twitter,
            linkedin
        } = this.state;
        return (
            <Fragment>
                <Row>
                    <Colxx xxs="12">
                        <div className="text-zero top-right-button-container">
                            <Link to='/app/author/view'><Button size='lg' color={'secondary'}><IntlMessages id={"menu.cancel"} /></Button></Link>
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
                                  Create Author
                                </CardTitle>
                                <Form className="dashboard-quick-post" onSubmit={this.createAuthor}>
                                    <FormGroup row>
                                        <Label sm="3">
                                            <IntlMessages id="name" />
                                        </Label>
                                        <Colxx sm="9">
                                            <Input type="text" value={name} onChange={this.handleInputChange} name="name" placeholder={'Name of Author *'} required/>
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
                                    <FormGroup row>
                                        <Label sm="3">
                                            <IntlMessages id="pages.description" />
                                        </Label>
                                        <Colxx sm="9">
                                            <Input type="textarea" rows="6" value={description} onChange={this.handleInputChange} name="description" placeholder={'Description *'} required/>
                                        </Colxx>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label sm="3">
                                            Facebook
                                        </Label>
                                        <Colxx sm="9">
                                            <Input type="text" value={facebook} onChange={this.handleInputChange} name="facebook" placeholder={'Facebook Link'} />
                                        </Colxx>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label sm="3">
                                            Instagram
                                        </Label>
                                        <Colxx sm="9">
                                            <Input type="text" value={instagram} onChange={this.handleInputChange} name="instagram" placeholder={'Instagram'} />
                                        </Colxx>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label sm="3">
                                            Youtube
                                        </Label>
                                        <Colxx sm="9">
                                            <Input type="text" value={youtube} onChange={this.handleInputChange} name="youtube" placeholder={'Youtube'} />
                                        </Colxx>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label sm="3">
                                            Twitter
                                        </Label>
                                        <Colxx sm="9">
                                            <Input type="text" value={twitter} onChange={this.handleInputChange} name="twitter" placeholder={'Twitter'} />
                                        </Colxx>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label sm="3">
                                            LinkedIn
                                        </Label>
                                        <Colxx sm="9">
                                            <Input type="text" value={linkedin} onChange={this.handleInputChange} name="linkedin" placeholder={'LinkedIn'} />
                                        </Colxx>
                                    </FormGroup>
                                    <Button className={`float-right btn-shadow btn-multiple-state ${this.state.loading ? "show-spinner" : ""}`} color="primary" disabled={this.state.loading}>
                                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                                        <span className="label">Create</span>
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
