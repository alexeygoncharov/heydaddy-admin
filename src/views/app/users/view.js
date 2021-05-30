import React, {Component, Fragment} from "react";
import {Button, Card, CardBody, CardTitle, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import {Colxx, Separator} from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
// import ReactTable from "react-table";
import ApiCall from '../../../config/network';
import Url from '../../../config/api';
import {NotificationManager} from "../../../components/common/react-notifications";
import {config} from "../../../config/env";
// import { confirmAlert } from 'react-confirm-alert';
// import {items} from "../../../data/carouselItems";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import Select from "react-select";
import {Table} from "rsuite";
import ReactTable from "../../../components/table";
import {confirmAlert} from "react-confirm-alert";
import {Link} from "react-router-dom";

const { Column, HeaderCell, Cell } = Table;
export default class AllUsers extends Component {
    constructor() {
        super();
        this.state = {
            selectAll: false,
            users: [],
            allUsers: [],
            allRoles: [],
            checked: [],
            selectedUser: '',
            userRoles: [],
            spinning: false,
            rolesUpdating: false,
            rolesModal: false,
            rolesViewModal: false,
            userPermissions: localStorage.userPermission !== undefined? JSON.parse(localStorage.userPermission) : [],
            //Pagination
            displayLength: 10,
            page: 1
        };
    }


    componentDidMount() {
        this.getAllUsers();
    };
    getAllUsers = async ()=> {
        this.setState({spinning: true});
        let response = await ApiCall.get(Url.ALL_USERS, await config())
        if(response.status=== 200){
                let roles  = response.data.roles.map(item => {
                    return {label: item.name, value: item._id, key: item._id, permissions: item.permissions}
                })
                this.setState({
                    users: response.data.users.reverse(),
                    allUsers: JSON.parse(JSON.stringify(response.data.users)),
                    spinning: false, allRoles: roles});


        }else {
            this.setState({spinning: false, });

        }
    };

    handleSelectedRoles = userRoles => {
    this.setState({...this.state.selectedUserRoles, selectedUserRoles: userRoles });
    };
    toggle = (item) => {
        this.setState(prevState => ({
            rolesModal: !prevState.rolesModal,
        }));
        if(Array.isArray(item.roles)){
            let userRoles = item.roles.map(item => {
                return {label: item.name, value: item._id, key: item._id, permissions: item.permissions}
            })
            this.setState({selectedUserRoles: userRoles, selectedUser: item});
        }

    };
    changeUserRoles = async () => {
        let roles = this.state.selectedUserRoles.map(item => {
            return item.value
        })
        if(roles.length === 0){
            return  NotificationManager.error(
                "Please Select One Or More Role",
                "Error",
                3000,
                null,
                null,
                'filled'
            );
        }
        this.setState({rolesUpdating: true});
        let response = await ApiCall.post(`${Url.CHANGE_USER_ROLE}/${this.state.selectedUser._id}`, {
            roles: roles,
        }, await config())
        if(response.status === 200){
            this.getAllUsers();
            this.setState({rolesUpdating: false, rolesModal: false});
            return  NotificationManager.success(
                "Role Updated Successfully",
                "Success",
                3000,
                null,
                null,
                'filled'
            );
        }else {
            this.setState({rolesUpdating: false});
        }
        // console.log(response)
    };
    toggleView = (userRoles)=> {
        this.setState(prevState => ({
            rolesViewModal: !prevState.rolesViewModal,
        }));
        if(Array.isArray(userRoles)){
            this.setState({userRoles: userRoles});
        }
    }
    handleChangePage=(dataKey)=> {
        // console.log(dataKey)
        this.setState({
            page: dataKey
        });
    };
    handleChangeLength=(dataKey)=> {
        this.setState({
            page: 1,
            displayLength: dataKey
        });
    };
    getData =() => {
        const { displayLength, page, allUsers } = this.state;
        return allUsers.filter((v, i) => {
            const start = displayLength * (page - 1);
            const end = start + displayLength;
            return i >= start && i < end;
        });
    };
    handleFilterChange = (e) => {
        this.setState({page: 1})
        const data = this.state.users.filter((v, i) => {
            const start = 1000 * (1 - 1);
            const end = start + 1000;
            return i >= start && i < end;
        })
        const filteredData = data.filter(item => {
            const query = e.target.value.toLowerCase();
            return (
                item.name.toLowerCase().indexOf(query) >= 0 ||
                // item.last_name.toLowerCase().indexOf(query) >= 0 ||
                item.email.toLowerCase().indexOf(query) >= 0
            )
        });
        this.setState({
            allUsers: filteredData
        })
        if(e.target.value=== ''){
            this.setState({
                allUsers: this.state.users
            })
        }
    };

    changeStatus  =  (item) => {
        confirmAlert({
            title: 'Confirmation!',
            message: 'Are you sure you want to Delete?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.confirmChangeStatus(item)
                },
                {
                    label: "No"
                }
            ]
        })
    };


    confirmChangeStatus = async (item) => {
        this.setState({spinning: true});
        let response = await ApiCall.get(`${Url.USER_DELETE}/${item}`, await config());
        if(response.status === 200){
            this.setState({spinning: false});
            this.getAllUsers();
            return  NotificationManager.success(
                "User deleted Successfully",
                "Success",
                3000,
                null,
                null,
                'filled'
            );
        }

    };
    render() {
        const data = this.getData();
        return (
            <Fragment>
                <Row>
                    <Colxx xxs="12">
                        <div className="text-zero top-right-button-container">
                            <Link to='/app/users/create'><Button size='lg' color={'secondary'}><IntlMessages id={"menu.create"} /></Button></Link>
                        </div>
                        <Breadcrumb heading="user.view" match={this.props.match} />
                        <Separator className="mb-5" />
                    </Colxx>
                </Row>
                <Row>
                    <Col>
                            <Card className="h-100">
                                <CardBody>
                                    <CardTitle>
                                        <IntlMessages id={"user.users"} />
                                    </CardTitle>
                                    <ReactTable
                                        data={data}
                                        loading={this.state.spinning}
                                        activePage={this.state.page}
                                        displayLength={this.state.displayLength}
                                        total={this.state.allUsers.length}
                                        onChangePage={this.handleChangePage}
                                        onChangeLength={this.handleChangeLength}
                                        handleFilterChange={this.handleFilterChange}
                                    >
                                        <Column width={200} align="center">
                                            <HeaderCell>No</HeaderCell>
                                            <Cell>
                                                {(rowData, rowIndex) => {
                                                    return <span>{rowIndex +1}</span>
                                                }}
                                            </Cell>
                                        </Column>
                                        <Column minWidth={200}  flexGrow={1} align="center">
                                            <HeaderCell>Name</HeaderCell>
                                            <Cell>
                                                {(rowData, rowIndex) => {
                                                    return <span>{rowData.name}</span>
                                                }}
                                            </Cell>
                                        </Column>
                                        <Column minWidth={200}  flexGrow={1} align="center">
                                            <HeaderCell>Email</HeaderCell>
                                            <Cell>
                                                {(rowData, rowIndex) => {
                                                    return <span>{rowData.email}</span>
                                                }}
                                            </Cell>
                                        </Column>
                                        <Column minWidth={200}  flexGrow={1} align="center">
                                            <HeaderCell>Roles</HeaderCell>
                                            <Cell>
                                                {(rowData, rowIndex) => {
                                                    return <div>
                                                        <Button color="primary" size="xs" className="mb-2" onClick={()=>this.toggleView(rowData.roles)}>
                                                            <IntlMessages id="user.view-roles" />
                                                        </Button>
                                                    </div>
                                                }}
                                            </Cell>
                                        </Column>
                                        <Column minWidth={200}  flexGrow={1} align="center">
                                            <HeaderCell>Actions</HeaderCell>
                                            <Cell>
                                                {(rowData, rowIndex) => {
                                                    return <div>
                                                        {this.state.userPermissions.find(item => item.name === "user.edit") &&
                                                        <Button color="secondary" size="xs" className="mb-2" onClick={()=>this.toggle(rowData)}>
                                                            <IntlMessages id="user.change-roles" />
                                                        </Button>}
                                                        {" "}{" "}
                                                        {this.state.userPermissions.find(item => item.name === "user.delete") &&
                                                        <Button color="danger" size="xs" className="mb-2" onClick={()=> this.changeStatus(rowData._id)}>
                                                            <IntlMessages id="delete" />
                                                        </Button>}
                                                    </div>
                                                }}
                                            </Cell>
                                        </Column>
                                    </ReactTable>

                                    <Modal isOpen={this.state.rolesModal} toggle={this.toggle}>
                                        <ModalHeader toggle={this.toggle}>
                                            <IntlMessages id="user.change-roles" />
                                        </ModalHeader>
                                        <ModalBody>
                                            <Select
                                                components={{ Input: CustomSelectInput }}
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                placeholder="Select Roles..."
                                                isMulti
                                                name="userRoles"
                                                value={this.state.selectedUserRoles}
                                                onChange={this.handleSelectedRoles}
                                                options={this.state.allRoles}
                                            />
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="secondary" onClick={this.toggle}>
                                                <IntlMessages id="role.close-permissions-modal" />
                                            </Button>
                                            <Button disabled={this.state.rolesUpdating}
                                                    className={`float-right btn-shadow btn-multiple-state ${this.state.rolesUpdating ? "show-spinner" : ""}`}
                                            onClick={this.changeUserRoles}
                                                    color="primary"
                                            >
                                        <span className="spinner d-inline-block">
                                            <span className="bounce1" />
                                            <span className="bounce2" />
                                            <span className="bounce3" />
                                        </span><span className="label">
                                                <IntlMessages id="user.update-roles" /></span>
                                            </Button>
                                        </ModalFooter>
                                    </Modal>
                                    <Modal isOpen={this.state.rolesViewModal} toggle={this.toggleView}>
                                        <ModalHeader toggle={this.toggleView}>
                                            <IntlMessages id="user.roles" />
                                        </ModalHeader>
                                        <ModalBody>
                                            {this.state.userRoles.length>0?
                                                this.state.userRoles.map((item, index)=> {
                                                    return (
                                                        <ul key={index}>
                                                            <li>{item.name}</li>
                                                        </ul>
                                                    )
                                                })
                                                : <h3>This User Have No Role, Please Assign a Role</h3>}

                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="secondary" onClick={this.toggleView}>
                                                <IntlMessages id="role.close-permissions-modal" />
                                            </Button>
                                        </ModalFooter>
                                    </Modal>
                                </CardBody>
                            </Card>



                    </Col>
                </Row>
            </Fragment>
        )
    }
}
