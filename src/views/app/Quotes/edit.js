import React, {Component, Fragment} from "react";
import {Button, Card, CardBody, CardTitle, Col, CustomInput, Form, FormGroup, Label, Row} from "reactstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import {Colxx, Separator} from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import ApiCall from '../../../config/network';
import Url from '../../../config/api';
import {NotificationManager} from "../../../components/common/react-notifications";
import {config} from "../../../config/env";
import {Link} from "react-router-dom";
import moment from "moment";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import 'react-quill/dist/quill.bubble.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const quillModules = {
    toolbar: [
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" }
        ],
        ["link", "image"],
        ["clean"]
    ]
};
const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image"
];

const initialState = {
    selectedAuthor: '',
    authors: [],
    posts: [],
    selectedPost: [],
    isPublished: false,
    description: '',
    date: moment(new Date()),
    spinning: true,
    loading: false
}
export default class UpdateQuote extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    };



    componentDidMount() {
        this.canceld = false;
        this.getAllPosts();
        this.getAllAuthors();
        this.getSingleQuote();
    }

    getAllPosts = async () => {
        if(this.canceld) return;
        let response = await ApiCall.get(Url.GET_ALL_POSTS, await config());
        if(response.status === 200){
            this.setState({
                posts: response.data.posts
            })
        }
    };

    getAllAuthors = async () => {
        if(this.canceld) return;
        let response = await ApiCall.get(Url.GET_ALL_AUTHORS, await config());
        if(response.status === 200){
            this.setState({
                authors: response.data.authors
            })
        }
    };

    getSingleQuote = async () => {
        let response = await ApiCall.get(`${Url.EDIT_QUOTE}/${this.props.match.params.slug}`, await config());
        if(response.status === 200) {
            const quote = response.data.quote;
            this.setState({
                selectedAuthor: quote.author._id,
                selectedPost: quote.post,
                description: quote.description,
                date: moment(quote.date),
                isPublished: quote.isPublished,
                spinning: false,
            })
        }
    }

    componentWillUnmount() {
        this.canceld = true;
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSelectAuthorChange = (e) => {
        if (e.target.value !== 'null') {
            this.setState({selectedAuthor: e.target.value})
        } else {
            this.setState({selectedAuthor: ""})
        }
    };

    handleSelectPostChange = (e) => {
        if (e.target.value !== 'null') {
            this.setState({selectedPost: e.target.value})
        } else {
            this.setState({selectedPost: ""})
        }
    };

    handleChangeContent = (description) => {
        this.setState({ description });
    };

    handleChangeDateTime = date => {
        this.setState({ date });
    };

    updateQuote = async (e)=> {
        e.preventDefault();
        const {
            selectedAuthor,
            selectedPost,
            description,
            isPublished,
            date,
        } = this.state;
        const validation = this.handleValidation();
        if(validation.status){
            this.setState({loading: true});
            let response = await ApiCall.post(`${Url.UPDATE_QUOTE}/${this.props.match.params.slug}`, {
                author: selectedAuthor,
                post: selectedPost,
                isPublished: isPublished,
                description,
                date,
            }, await config());
            if(response.status === 200){
                this.setState(initialState);
                this.props.history.push('/app/quote/view')
                return  NotificationManager.success(
                    "Quote Updated Successfully",
                    "Success",
                    3000,
                    null,
                    null,
                    'filled'
                );
            }else {
                this.setState({loading: false});
            }
        } else {
            return  NotificationManager.error(
                validation.message,
                "Error",
                3000,
                null,
                null,
                'filled'
            );
        }


    };

    handleValidation = () => {
        const {
            // selectedPost,
            selectedAuthor, date, description } = this.state;
        // const postValidation = {
        //     status: false,
        //     message: "Please Select Post",
        // };
        const authorValidation = {
            status: false,
            message: "Please Select Author",
        };
        const dateValidation = {
            status: false,
            message: "Please Select Date",
        };
        const descriptionValidation = {
            status: false,
            message: "Please Write Quote Description",
        };
        const passed = {
          status: true
        };
        return selectedAuthor !== ""?
            // selectedPost === ""? postValidation :
            date === ""? dateValidation :
            description === ""? descriptionValidation :
            description=== "<p><br></p>"? descriptionValidation :
            passed
            : authorValidation;
    };


    handlePublishedChange = (e) => {
        this.setState({
            isPublished: e.target.checked
        })
    };

    render() {
        const {
            selectedAuthor,
            authors,
            posts,
            selectedPost,
            description,
            isPublished,
            date,
            spinning
        } = this.state;
        return (
            <Fragment>
                <Row>
                    <Colxx xxs="12">
                        <div className="text-zero top-right-button-container">
                            <Link to='/app/quote/view'><Button size='lg' color={'secondary'}><IntlMessages id={"menu.cancel"} /></Button></Link>
                        </div>
                        <Breadcrumb heading="menu.edit" match={this.props.match} />
                        <Separator className="mb-5" />
                    </Colxx>
                </Row>
                {spinning? <div className="loading"/> :
                    <Row>
                        <Col xxs="10">
                            <div className='col-sm-12 col-lg-10 col-xs-12 '>
                                <Card>
                                    <div className="position-absolute card-top-buttons">
                                    </div>
                                    <CardBody>
                                        <CardTitle>
                                            Update Quote
                                        </CardTitle>
                                        <Form className="dashboard-quick-post" onSubmit={this.updateQuote}>
                                            <FormGroup row>
                                                <Label sm="3">
                                                    Select Author
                                                </Label>
                                                <Colxx sm="9">
                                                    <select
                                                        name="select"
                                                        className="form-control"
                                                        value={selectedAuthor}
                                                        onChange={this.handleSelectAuthorChange}
                                                    >
                                                        <option value='null'>Select an option..</option>
                                                        {authors.map(item => {
                                                            return (
                                                                <option value={item._id} key={item._id}>{item.name}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </Colxx>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label sm="3">
                                                    Select Post
                                                </Label>
                                                <Colxx sm="9">
                                                    <select
                                                        name="select"
                                                        className="form-control"
                                                        value={selectedPost}
                                                        onChange={this.handleSelectPostChange}
                                                    >
                                                        <option value='null'>Select an option..</option>
                                                        {posts.map(item => {
                                                            return (
                                                                <option value={item._id} key={item._id}>{item.title}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </Colxx>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label sm="3">
                                                    Date
                                                </Label>
                                                <Colxx sm="9">
                                                    <DatePicker
                                                        className="mb-5"
                                                        selected={date}
                                                        onChange={this.handleChangeDateTime}
                                                        placeholderText={'Date'}
                                                        dateFormat="LLL"
                                                        dropdownMode={"select"}/>
                                                </Colxx>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label sm="3">
                                                    Is Published
                                                    {/*<IntlMessages id="guide.category"/>*/}
                                                </Label>
                                                <Colxx sm="9">
                                                    <CustomInput
                                                        type="checkbox"
                                                        key={'isPublished'}
                                                        name='isPublished'
                                                        checked={isPublished}
                                                        onChange={this.handlePublishedChange}
                                                        id={'isPublished'}
                                                        label={'is Published'}
                                                    />
                                                </Colxx>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label sm="3">
                                                    Description
                                                </Label>
                                                <Colxx sm="9">
                                                    <ReactQuill
                                                        theme="snow"
                                                        value={description}
                                                        onChange={this.handleChangeContent}
                                                        modules={quillModules}
                                                        formats={quillFormats}/>
                                                </Colxx>
                                            </FormGroup>

                                            <Button className={`float-right btn-shadow btn-multiple-state ${this.state.loading ? "show-spinner" : ""}`} color="primary" disabled={this.state.loading}>
                                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                                                <span className="label">Update</span>
                                            </Button>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </div>
                        </Col>

                    </Row>}
            </Fragment>
        )
    }
}
