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
    id: null,
    loading: false,
    spinning: false
}
export default class UpdateTag extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        this._isMounted = false
        this.getSingleTagData();
    }

    componentWillUnmount() {
        this._isMounted = true
    }

    getSingleTagData = async () => {
        this.setState({spinning: true});
        let response = await ApiCall.get(`${Url.EDIT_TAG}/${this.props.match.params.slug}`, await config());
        if (response.status === 200) {
            if (!this._isMounted) {
                this.setState({
                    name: response.data.tag.name,
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


    updateTag = async (e) => {
        e.preventDefault();
        const {name } = this.state;

        this.setState({loading: true});
        let response = await ApiCall.post(`${Url.UPDATE_TAG}/${this.props.match.params.slug}`, {
            name: name,
        }, await config());
        if (response.status === 200) {
            this.setState(initialState);
            this.props.history.push('/app/tags/view')
            return NotificationManager.success(
                "Tag Updated Successfully",
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
        const {name, spinning } = this.state;
        return (
            <Fragment>
                <Row>
                    <Colxx xxs="12">
                        <div className="text-zero top-right-button-container">
                            <Link to='/app/tags/view'><Button size='lg' color={'secondary'}><IntlMessages
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
                                          Update Tag
                                        </CardTitle>
                                        <Form className="dashboard-quick-post" onSubmit={this.updateTag}>
                                            <FormGroup row>
                                                <Label sm="3">
                                                    <IntlMessages id="name"/>
                                                </Label>
                                                <Colxx sm="9">
                                                    <Input type="text" value={name} onChange={this.handleInputChange}
                                                           name="name" placeholder={'Name *'} required/>
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
