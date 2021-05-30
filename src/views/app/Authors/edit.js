import React, {Component, Fragment} from "react";
import {Button, Card, CardBody, CardTitle, Col, Form, FormGroup, Input, Label, Row} from "reactstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import {Colxx, Separator} from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import ApiCall from "../../../config/network";
import Url from "../../../config/api";
import {config} from "../../../config/env";
import {NotificationManager} from "../../../components/common/react-notifications";
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
    id: null,
    loading: false,
    spinning: false
}
export default class UpdateAuthor extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        this._isMounted = false
        this.getSingleAuthor();
    }

    componentWillUnmount() {
        this._isMounted = true
    }

    getSingleAuthor = async () => {
        this.setState({spinning: true});
        let response = await ApiCall.get(`${Url.EDIT_AUTHOR}/${this.props.match.params.slug}`, await config());
        if (response.status === 200) {
            console.log(response)
            if (!this._isMounted) {
                this.setState({
                    name: response.data.author.name,
                    description: response.data.author.description,
                    email: response.data.author.email,
                    youtube: response.data.author.social.youtube,
                    instagram: response.data.author.social.instagram,
                    facebook: response.data.author.social.facebook,
                    twitter: response.data.author.social.twitter,
                    linkedin: response.data.author.social.linkedin,
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


    updateAuthor = async (e) => {
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
        let response = await ApiCall.post(`${Url.UPDATE_AUTHOR}/${this.props.match.params.slug}`, {
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
        if (response.status === 200) {
            this.setState(initialState);
            this.props.history.push('/app/author/view')
            return NotificationManager.success(
                "Author Updated Successfully",
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

    render() {
        const {
            name,
            description,
            email,
            youtube,
            instagram,
            facebook,
            twitter,
            linkedin,
            spinning
        } = this.state;
        return (
            <Fragment>
                <Row>
                    <Colxx xxs="12">
                        <div className="text-zero top-right-button-container">
                            <Link to='/app/author/view'><Button size='lg' color={'secondary'}><IntlMessages
                                id={"menu.cancel"}/></Button></Link>
                        </div>
                        <Breadcrumb heading="tag.edit" match={this.props.match}/>
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
                                          Update Author
                                        </CardTitle>
                                        <Form className="dashboard-quick-post" onSubmit={this.updateAuthor}>
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
                                            <Button
                                                className={`float-right btn-shadow btn-multiple-state ${this.state.loading ? "show-spinner" : ""}`}
                                                color="primary" disabled={this.state.loading}>
                                                <span className="spinner d-inline-block"><span
                                                    className="bounce1"/><span className="bounce2"/><span
                                                    className="bounce3"/></span>
                                                <span className="label">Update</span>
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
