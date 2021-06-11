import React, {Component, Fragment} from "react";
import {Button, Card, CardBody, CardTitle, Col, Row,} from "reactstrap";
import IntlMessages from "../../../../helpers/IntlMessages";

import moment from "moment";
// import ReactTable from "react-table";
import ApiCall from '../../../../config/network';
import Url from '../../../../config/api';
import {config} from "../../../../config/env";
import {Link} from "react-router-dom";
import {Table} from "rsuite";
import '../../table.css';
import ReactTable from "../../../../components/table";
import {NotificationManager} from "../../../../components/common/react-notifications";
import {confirmAlert} from "react-confirm-alert";
import {Colxx, Separator} from "../../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../../containers/navs/Breadcrumb";

const {Column, HeaderCell, Cell, Pagination} = Table;


export default class Verified extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            selectAll: false,
            checked: [],
            selectedUser: '',
            spinning: false,
            dashboardSpinning: false,
            userPermissions: localStorage.userPermission !== undefined? JSON.parse(localStorage.userPermission) : [],
            //Pagination
            displayLength: 10,
            page: 1,
            length: 0,
            search: ""
        };
    }


    componentDidMount() {
        this.getAllLanguages();
    };
    getAllLanguages = async ()=> {
        this.setState({spinning: true});
        let response = await ApiCall.get(`${Url.GET_ALL_UNVERIFIED_MODELS_ACCOUNT}?page=${this.state.page}&limit=${this.state.displayLength}&q=${this.state.search}`, await config())
        if(response.status=== 200){
            this.setState({
                data: response.data.models,
                spinning: false,
                length: response.data.length});
        }else {
            this.setState({spinning: false });
        }
    };
    getAllLanguagesSearch = async (search)=> {
        let response = await ApiCall.get(`${Url.GET_ALL_UNVERIFIED_MODELS_ACCOUNT}?page=${1}&limit=${this.state.displayLength}&q=${search}`, await config())
        if(response.status=== 200){
            this.setState({
                data: response.data.models,
                length: response.data.length});
        }else {
            this.setState({spinning: false });
        }
    };

    dataShownPagination = async(dataKey) => {
        let response = await ApiCall.get(`${Url.GET_ALL_UNVERIFIED_MODELS_ACCOUNT}?page=${dataKey}&limit=${this.state.displayLength}&q=${this.state.search}`, await config())

        if(response.status=== 200){
            this.setState({
                data: response.data.models,
                length: response.data.length});
        }else {
            this.setState({spinning: false });
        }
    }
    handleChangePage=async(dataKey)=> {
        this.setState({
            page: dataKey
        });
        this.dataShownPagination(dataKey)
    };

    handleChangeLength=async (dataKey)=> {
        this.setState({
            page: 1,
            displayLength: dataKey
        });
        this.shownDataLength(dataKey)
    };
    shownDataLength = async(dataKey) =>{
        let response = await ApiCall.get(`${Url.GET_ALL_UNVERIFIED_MODELS_ACCOUNT}?page=${1}&limit=${dataKey}&q=${this.state.search}`, await config())
        if(response.status=== 200){
            this.setState({
                data: response.data.models,
                length: response.data.length
            });
        }else {
            this.setState({spinning: false });
        }
    }


    handleFilterChange = (e) => {
        this.setState({page: 1,
            search: e.target.value })
        this.getAllLanguagesSearch(e.target.value);
    };

    confirmDelete = async (item) => {
        this.setState({spinning: true});
        let response = await ApiCall.get(`${Url.APPROVE_MODEL}/${item}`, await config());
        if(response.status === 200){
            this.setState({spinning: false});
            this.getAllLanguages();
            return  NotificationManager.success(
                "Model Approved Successfully",
                "Success",
                3000,
                null,
                null,
                'filled'
            );
        }
    };
    changeStatusDelete  =  (item) => {
        confirmAlert({
            title: 'Confirmation!',
            message: 'Are you sure you want to Approve ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.confirmDelete(item)
                },
                {
                    label: "No"
                }
            ]
        })
    };

    render() {
        const { spinning } = this.state;
        return (
            <Fragment>
                    <Row>
                        <Col>
                            <Card className="h-100">
                                <CardBody>
                                    <CardTitle>
                                        Model Status
                                    </CardTitle>

                                        <ReactTable
                                            data={this.state.data}
                                            loading={this.state.spinning}
                                            activePage={this.state.page}
                                            displayLength={this.state.displayLength}
                                            total={this.state.length}
                                            onChangePage={this.handleChangePage}
                                            onChangeLength={this.handleChangeLength}
                                            handleFilterChange={this.handleFilterChange}
                                        >
                                            <Column width={200} align="center">
                                                <HeaderCell>No</HeaderCell>
                                                <Cell>
                                                    {(rowData, rowIndex) => {
                                                        return <span>{rowIndex + 1}</span>
                                                    }}
                                                </Cell>
                                            </Column>
                                            <Column minWidth={200} flexGrow={1} align="center">
                                                <HeaderCell> Name </HeaderCell>
                                                <Cell>
                                                    {(rowData, rowIndex) => {
                                                        return <span>{rowData.name}</span>
                                                    }}
                                                </Cell>
                                            </Column>
                                            <Column minWidth={200} flexGrow={1} align="center">
                                                <HeaderCell> Email </HeaderCell>
                                                <Cell>
                                                    {(rowData, rowIndex) => {
                                                        return <span>{rowData.email}</span>
                                                    }}
                                                </Cell>
                                            </Column>
                                            <Column minWidth={200} flexGrow={1} align="center">
                                                <HeaderCell> Status </HeaderCell>
                                                <Cell>
                                                    {(rowData, rowIndex) => {
                                                        return <span>{rowData.email}</span>
                                                    }}
                                                </Cell>
                                            </Column>
                                            <Column width={100} align="center">
                                                <HeaderCell>Profile Image</HeaderCell>
                                                <Cell>
                                                    {(rowData, rowIndex) => {
                                                        if(rowData?.profile){
                                                            return <div>
                                                                <img style={{height: '20px'}} src={rowData?.profile?.path} alt='profile'/>
                                                            </div>
                                                        }
                                                    }}
                                                </Cell>
                                            </Column>
                                            <Column width={100} align="center">
                                                <HeaderCell>National Id</HeaderCell>
                                                <Cell>
                                                    {(rowData, rowIndex) => {
                                                        if(rowData?.nationalId){
                                                            return <div>
                                                                <img style={{height: '20px'}} src={rowData?.nationalId?.path} alt='national Id'/>
                                                            </div>
                                                        }
                                                    }}
                                                </Cell>
                                            </Column>
                                            <Column minWidth={200} flexGrow={1} align="center">
                                                <HeaderCell>Action</HeaderCell>
                                                <Cell>
                                                    {(rowData, rowIndex) => {
                                                        return <div>
                                                            {this.state.userPermissions.find(item => item.name === "languages.delete") &&
                                                            <Button color="warning" size="xs" className="mb-2"
                                                                    onClick={() => this.changeStatusDelete(rowData._id)}>
                                                                Approve
                                                            </Button>}
                                                        </div>
                                                    }}
                                                </Cell>
                                            </Column>
                                        </ReactTable>

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
            </Fragment>
        )
    }
}
