import React, {Component, Fragment} from "react";
import {Row, Col} from "reactstrap";
import {
    Card,
    CardBody,
    CardTitle,
    FormGroup,
    Label,
    Button,
    CustomInput,
    Form,
    Input
} from "reactstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import {Colxx, Separator} from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import ApiCall from '../../../config/network';
import Url from '../../../config/api';
import {NotificationManager} from "../../../components/common/react-notifications";
import {config} from "../../../config/env";
import "react-datepicker/dist/react-datepicker.css";
import {Link} from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import 'react-quill/dist/quill.bubble.css';
import DropzoneExample from "../../../containers/forms/DropzoneExample";
import Select from "react-select";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import DatePicker from "react-datepicker";
import moment from "moment";

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
    title: '',
    description: '',
    seoDescription: '',
    categories: [],
    selectedCategory: '',
    authors: [],
    selectedAuthor: '',
    tags: [],
    selectedTags: [],
    seoTags: [],
    selectedSeoTags: [],
    image: "",
    imageUrl: "",
    publishingDate: moment(new Date()),
    isFeatured: false,
    isSlider: false,
    loading: false,
    spinning: true,

}

export default class UpdatePost extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    };

    componentDidMount() {
        this._isMounted = false;
        this.getAllCategories();
        this.getAllAuthors();
        this.getAllTags();
        this.getAllSeoTags();
        this.getSinglePost();
    }

    componentWillUnmount() {
        this._isMounted = true
    };


    getAllCategories = async () => {
        if (!this._isMounted) {
            let response = await ApiCall.get(Url.GET_ALL_CATEGORIES, await config())
            // console.log(response)
            if (response.status === 200) {
                this.setState({categories: response.data.categories.reverse()});
            }
        }

    };

    getAllTags = async () => {
        if (!this._isMounted) {
            let response = await ApiCall.get(Url.GET_ALL_TAGS, await config())
            // console.log(response)
            if (response.status === 200) {
                this.setState({tags: response.data.tags.reverse()});
            }
        }

    };

    getAllAuthors = async () => {
        if (!this._isMounted) {
            let response = await ApiCall.get(Url.GET_ALL_AUTHORS, await config())
            // console.log(response)
            if (response.status === 200) {
                this.setState({authors: response.data.authors.reverse()});
            }
        }

    };

    getAllSeoTags = async () => {
        if (!this._isMounted) {
            let response = await ApiCall.get(Url.GET_ALL_SEO_TAGS, await config())
            // console.log(response)
            if (response.status === 200) {
                this.setState({seoTags: response.data.seoTags.reverse()});
            }
        }

    };

    getSinglePost = async () => {
        let response = await ApiCall.get(`${Url.EDIT_POST}/${this.props.match.params.slug}`, await config());
        if(response.status === 200){
            const post = response.data.post;
            this.setState({
                title: post.title,
                description: post.description,
                selectedCategory: post.categories.map(item => {return { label: item.name, key: item._id, value: item._id }}),
                selectedAuthor: post.author,
                selectedTags: post.tags.map(item => {return { label: item.name, key: item._id, value: item._id }}),
                selectedSeoTags: post.seoTags.map(item => {return { label: item.name, key: item._id, value: item._id }}),
                imageUrl: post.image,
                seoDescription: post.metaDescription || "",
                isFeatured: post.featured,
                isSlider: post.isSlider,
                publishingDate: moment(post.publishingDate),
                spinning: false
            })
        }
    };

    updatePost = async (e) => {
        e.preventDefault();
        const {
            title,
            description,
            selectedCategory,
            selectedAuthor,
            selectedTags,
            seoDescription,
            selectedSeoTags,
            image,
            isFeatured,
            isSlider,
            publishingDate,
        } = this.state;
        let validation = this.handleValidations();
        if (validation.status) {
            this.setState({loading: true})
            const data = new FormData();
            data.append('title', title);
            data.append('description', description);
            data.append('categories', JSON.stringify(selectedCategory.map(item => (item.value))));
            data.append('author', selectedAuthor);
            data.append('tags', JSON.stringify(selectedTags.map(item => (item.value))));
            data.append('seoTags', JSON.stringify(selectedSeoTags.map(item => (item.value))));
            data.append('image', image === ""? null : image);
            data.append('metaDescription', seoDescription);
            data.append('featured', isFeatured);
            data.append('isSlider', isSlider);
            data.append('publishingDate', publishingDate);
            let response = await ApiCall.post(`${Url.UPDATE_POST}/${this.props.match.params.slug}`, data, await config())
            if (response.status === 200) {
                this.setState(initialState);
                this.props.history.push('/app/post/view')
                return NotificationManager.success(
                    "Post Updated Successfully",
                    "Success",
                    3000,
                    null,
                    null,
                    'filled'
                );
            } else {
                this.setState({loading: false});
            }
        } else {

            return NotificationManager.error(
                validation.message,
                "Error",
                3000,
                null,
                null,
                'filled'
            );
        }
    };
    handleValidations = () => {
        const {
            title,
            description,
            selectedTags,
            selectedSeoTags,
            selectedCategory,
        } = this.state;
        let categoryValidation = {
            message: 'Please Select One Or More Category',
            status: false,
        };
        let tagsValidation = {
            message: 'Please Select Post Tags',
            status: false,
        };
        let seoTagsValidation = {
            message: 'Please Select Post SEO Tags',
            status: false,
        };
        let descriptionValidation = {
            message: 'Please add description',
            status: false,
        };
        let titleValidation = {
            message: 'Please write Title',
            status: false,
        };
        let passed = {
            status: true
        };
        return title !== "" ?
            selectedCategory === "" ? categoryValidation :
                selectedTags === ""? tagsValidation :
                    selectedSeoTags === ""? seoTagsValidation :
                        description === ""? descriptionValidation :
                            passed
            : titleValidation

    };



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
    handleSelectTypeChange  = (e)=> {
        if(e.target.value !== 'null'){
            this.setState({selectedType: e.target.value})
        }else {
            this.setState({selectedType: ''})
        }
    };

    handleFeaturedChange = (e) => {
        this.setState({
            isFeatured: e.target.checked
        })
    };

    handleSliderChange = (e) => {
        this.setState({
            isSlider: e.target.checked
        })
    };

    handleChangeContent = (content) => {
        this.setState({ description: content });
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
    };

    handleChangeCategories = (selectedCategory) => {
        this.setState({ selectedCategory })
    };

    handleChangeTags = (selectedTags) => {
        this.setState({ selectedTags })
    };

    handleChangeSeoTags = (selectedSeoTags) => {
        this.setState({ selectedSeoTags })
    };

    handleChangeDateTime = publishingDate => {
        this.setState({
            publishingDate
        });
    };
    render() {

        const {
            title,
            description,
            categories,
            selectedCategory,
            authors,
            selectedAuthor,
            tags,
            selectedTags,
            seoTags,
            selectedSeoTags,
            isFeatured,
            isSlider,
            seoDescription,
            publishingDate,
            spinning,
        } = this.state;
        return (
            <Fragment>
                <Row>
                    <Colxx xxs="12">
                        <div className="text-zero top-right-button-container">
                            <Link to='/app/post/view'><Button size='lg' color={'secondary'}><IntlMessages id={"menu.cancel"} /></Button></Link>
                        </div>
                        <Breadcrumb heading="guides.edit" match={this.props.match}/>
                        <Separator className="mb-5"/>
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
                                            Update Post
                                        </CardTitle>
                                        <Form className="dashboard-quick-post" onSubmit={this.updatePost}>
                                            <FormGroup row>
                                                <Label sm="3">
                                                    <IntlMessages id="guide.title"/>
                                                </Label>
                                                <Colxx sm="9">
                                                    <Input type="text" value={title} onChange={this.handleInputChange}
                                                           name="title" placeholder={'Title *'} required/>
                                                </Colxx>
                                            </FormGroup>
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
                                                    Select Categories
                                                    {/*<IntlMessages id="closed-Opened"/>**/}
                                                </Label>
                                                <Colxx sm="9">
                                                    <Select
                                                        components={{ Input: CustomSelectInput }}
                                                        className="react-select"
                                                        classNamePrefix="react-select"
                                                        isMulti
                                                        placeHoleder={'Please Select Post Categories'}
                                                        name="form-field-name"
                                                        value={selectedCategory}
                                                        onChange={this.handleChangeCategories}
                                                        options={categories.map(item => {
                                                            return {label: item.name, value: item._id, key: item._id}
                                                        })}
                                                    />
                                                </Colxx>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label sm="3">
                                                    Select Tags
                                                    {/*<IntlMessages id="closed-Opened"/>**/}
                                                </Label>
                                                <Colxx sm="9">
                                                    <Select
                                                        components={{ Input: CustomSelectInput }}
                                                        className="react-select"
                                                        classNamePrefix="react-select"
                                                        isMulti
                                                        placeHoleder={'Please Select Language'}
                                                        name="form-field-name"
                                                        value={selectedTags}
                                                        onChange={this.handleChangeTags}
                                                        options={tags.map(item => {
                                                            return {label: item.name, value: item._id, key: item._id}
                                                        })}
                                                    />
                                                </Colxx>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label sm="3">
                                                    Select Seo Tags
                                                    {/*<IntlMessages id="closed-Opened"/>**/}
                                                </Label>
                                                <Colxx sm="9">
                                                    <Select
                                                        components={{ Input: CustomSelectInput }}
                                                        className="react-select"
                                                        classNamePrefix="react-select"
                                                        isMulti
                                                        placeHoleder={'Please Select Language'}
                                                        name="form-field-name"
                                                        value={selectedSeoTags}
                                                        onChange={this.handleChangeSeoTags}
                                                        options={seoTags.map(item => {
                                                            return {label: item.name, value: item._id, key: item._id}
                                                        })}
                                                    />
                                                </Colxx>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label sm="3">
                                                    Seo Description {" "}
                                                    <span className="text-muted">
                                                    (Your description must include targeted keyword)
                                                </span>

                                                </Label>
                                                <Colxx sm="9">
                                                    <Input type="textarea" value={seoDescription} onChange={this.handleInputChange}
                                                           name="seoDescription" placeholder={'Seo Description '} />
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
                                                        onChange={this.handleFeaturedChange}
                                                        id={'isFeatured'}
                                                        label={'is Featured'}
                                                    />
                                                </Colxx>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label sm="3">
                                                    Is Slider
                                                    {/*<IntlMessages id="guide.category"/>*/}
                                                </Label>
                                                <Colxx sm="9">
                                                    <CustomInput
                                                        type="checkbox"
                                                        key={'isSlider'}
                                                        name='isSlider'
                                                        checked={isSlider}
                                                        onChange={this.handleSliderChange}
                                                        id={'isSlider'}
                                                        label={'is Slider'}
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
                                            <FormGroup row>
                                                <Label sm="3">
                                                    Publishing Date
                                                </Label>
                                                <Colxx sm="9">
                                                    <DatePicker
                                                        className="mb-5"
                                                        selected={publishingDate}
                                                        // minDate={moment(new Date())}
                                                        onChange={this.handleChangeDateTime}
                                                        placeholderText={'Publishing Date'}
                                                        dateFormat="LLL"
                                                        // timeCaption="Time"
                                                        dropdownMode={"select"}/>
                                                </Colxx>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label sm="3">
                                                    Image
                                                </Label>
                                                <Colxx sm="9">
                                                    <DropzoneExample
                                                        fileTypes="image/*"
                                                        url={this.state.imageUrl}
                                                        onChange={this.handleChangeImage}
                                                        removeFile={this.removeImage}
                                                    />
                                                </Colxx>
                                            </FormGroup>
                                            <Button
                                                className={`float-right btn-shadow btn-multiple-state ${this.state.loading ? "show-spinner" : ""}`}
                                                color="primary" disabled={this.state.loading}

                                            >
                                        <span className="spinner d-inline-block">
                          <span className="bounce1"/>
                          <span className="bounce2"/>
                          <span className="bounce3"/>
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
