import React, {Component} from "react";
import {Button, Card, CardTitle, FormGroup, Label, Row} from "reactstrap";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {Field, Form, Formik} from "formik";
import {loginUser} from "../../redux/actions";
import {Colxx} from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import ApiCall from '../../config/network';
import Url from '../../config/api';
import {NotificationManager} from "../../components/common/react-notifications";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
      error: {status: false, message: ''}
    };
  }

  onUserLogin =async (values) => {
    if (!this.props.loading) {
      if (values.email !== "" && values.password !== "") {
        this.setState({loading: true});
        let response = await ApiCall.post(Url.LOGIN_USER, {
          email: values.email,
          password: values.password
        })
        if (response.status === 200){
          console.log(response.data)
          this.setState({loading: false, error: {status: false, message: ''}});
          localStorage.setItem('userToken', response.data.token);
          localStorage.setItem('currentUser', JSON.stringify(response.data.user));
          localStorage.setItem('userPermission', JSON.stringify(response.data.permissions));
          this.props.history.push('/')
        }else {
          this.setState({loading: false});
          return  NotificationManager.error(
              "Invalid Credentials",
              "Login Error",
              3000,
              null,
              null,
              'filled'
          );
        }
        // console.log(response)
      }
    }
  }

  validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Please enter your email address";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  }

  validatePassword = (value) => {
    let error;
    if (!value) {
      error = "Please enter your password";
    }
    return error;
  }

  componentDidMount() {
    if(localStorage.userToken){
      this.props.history.push('/')
    }
  }

  render() {
    const { password, email } = this.state;
    const initialValues = {email,password};

    return (

        <Row className="h-100">
              <Colxx xxs="12" md="10" className="mx-auto my-auto">
                <Card className="auth-card">
                  <div className="form-side">
                    {/*<NavLink to={`/`} className="white">*/}
                    {/*  <span className="logo-single" />*/}
                    {/*</NavLink>*/}
                    <NavLink to={`/`} >
                      {/*<span className="logo-single" />*/}
                      <img alt='Blog logo' src={'/assets/img/hexaa.png'} style={{maxHeight: '80px'}}/>
                    </NavLink>
                    {/*<NavLink to={`/`}>*/}
                    {/*  <h1 className='font-weight-bold mb-5'>XProjets</h1>*/}
                    {/*</NavLink>*/}
                    <CardTitle className="mb-4 mt-2">
                      <IntlMessages id="user.login-title" />
                    </CardTitle>

                    <Formik
                        initialValues={initialValues}
                        onSubmit={this.onUserLogin}>
                      {({ errors, touched }) => (
                          <Form className="av-tooltip tooltip-label-bottom">
                            <FormGroup className="form-group has-float-label">
                              <Label>
                                <IntlMessages id="user.email" />
                              </Label>
                              <Field
                                  className="form-control"
                                  name="email"
                                  validate={this.validateEmail}
                              />
                              {errors.email && touched.email && (
                                  <div className="invalid-feedback d-block">
                                    {errors.email}
                                  </div>
                              )}
                            </FormGroup>
                            <FormGroup className="form-group has-float-label">
                              <Label>
                                <IntlMessages id="user.password" />
                              </Label>
                              <Field
                                  className="form-control"
                                  type="password"
                                  name="password"
                                  validate={this.validatePassword}
                              />
                              {errors.password && touched.password && (
                                  <div className="invalid-feedback d-block">
                                    {errors.password}
                                  </div>
                              )}
                            </FormGroup>
                            {this.state.resendEmail &&
                            <p><IntlMessages id="wizard.notEmailReceived" /> {" "}{" "}
                              <Button color='primary' size='xs' className={`ml-2 btn-shadow btn-multiple-state ${this.state.resendingEmail ? "show-spinner" : ""}`}
                                      onClick={this.resendEmail}
                              >
                                      <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                                <span className="label">
                                        <IntlMessages id="resendEmail" />
                                      </span>
                              </Button></p>
                            }

                            <div className="d-flex justify-content-between align-items-center">
                              <Button
                                  color="primary"
                                  className={`btn-shadow btn-multiple-state ${this.state.loading ? "show-spinner" : ""}`}
                                  size="lg"
                              >
                        <span className="spinner d-inline-block">
                          <span className="bounce1" />
                          <span className="bounce2" />
                          <span className="bounce3" />
                        </span>
                                <span className="label"><IntlMessages id="user.login-button" /></span>
                              </Button>
                            </div>
                            {/*<div className='mt-4'>*/}
                            {/*  <Link to={'/user/forgot-password'}>*/}
                            {/*    <h6 style={{textDecoration: 'underline'}}><IntlMessages id='forgotPasswordQuestion' /></h6>*/}
                            {/*  </Link>*/}

                            {/*</div>*/}
                            {/*<p className="mb-0 mt-5 not-member-message">*/}
                            {/*  <IntlMessages id='user.not-member'/>{"  "}*/}
                            {/*  <NavLink to={`/user/register`} className="black mt-5" style={{fontWeight: 'bold', fontSize: '25px'}}>*/}
                            {/*    <Button size='xs' color='primary'><IntlMessages id='user.register'/></Button>*/}
                            {/*  </NavLink>*/}
                            {/*</p>*/}

                          </Form>
                      )}
                    </Formik>
                  </div>
                  <div className="position-relative image-side">
                    <img className={'login-image'} src={'https://colorlib.com/etc/regform/colorlib-regform-7/images/signup-image.jpg'} alt={'xprojets login'}/>
                    {/*<p className="text-white h2">XProjets Admin Panel</p>*/}
                    <p className="mb-0 mt-5">
                      {/*Please use your credentials to login.*/}
                      {/*<br />*/}
                      {/*<IntlMessages id='user.not-member'/>{"  "}*/}

                      {/*<br/>*/}
                      {/*<NavLink to={`/user/register`} className="black mt-5" style={{fontWeight: 'bold', fontSize: '25px'}}>*/}
                      {/*  <Button size='xs' color='primary'><IntlMessages id='user.register'/></Button>*/}
                      {/*</NavLink>*/}
                    </p>
                  </div>
                </Card>
              </Colxx>
        </Row>
    );
  }
}
const mapStateToProps = ({ authUser }) => {
  const { user, loading, error } = authUser;
  return { user, loading, error };
};

export default connect(
    mapStateToProps,
    {
      loginUser
    }
)(Login);
