import React, {Component, Fragment} from "react";
import {Button, Card, CardBody, CardTitle, Col, Row} from "reactstrap";
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
import {Table} from "rsuite";
import ReactTable from "../../../components/table";
import {confirmAlert} from "react-confirm-alert";
import {Link} from "react-router-dom";
import moment from "moment";
import Badge from "reactstrap/es/Badge";

const { Column, HeaderCell, Cell } = Table;
export default class Quotes extends Component {
    constructor() {
        super();
        this.state = {
            selectAll: false,
            quotes: [],
            allQuotes: [],
            checked: [],
            selectedUser: '',
            spinning: false,
            userPermissions: localStorage.userPermission !== undefined? JSON.parse(localStorage.userPermission) : [],
            //Pagination
            displayLength: 10,
            page: 1
        };
    }


    componentDidMount() {
        this.getAllQuotes();
    };
    getAllQuotes = async ()=> {
        this.setState({spinning: true});
        let response = await ApiCall.get(Url.ALL_QUOTES, await config());
        // return console.log(response)
        if(response.status=== 200){
            this.setState({
                quotes: response.data.quotes.reverse(),
                allQuotes: JSON.parse(JSON.stringify(response.data.quotes)),
                spinning: false
            });


        }else {
            this.setState({spinning: false, });

        }
    };




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
        const { displayLength, page, allQuotes } = this.state;
        return allQuotes.filter((v, i) => {
            const start = displayLength * (page - 1);
            const end = start + displayLength;
            return i >= start && i < end;
        });
    };
    handleFilterChange = (e) => {
        this.setState({page: 1})
        const data = this.state.quotes.filter((v, i) => {
            const start = 1000 * (1 - 1);
            const end = start + 1000;
            return i >= start && i < end;
        })
        const filteredData = data.filter(item => {
            const query = e.target.value.toLowerCase();
            return (
                item.author.name.toLowerCase().indexOf(query) >= 0
            )
        });
        this.setState({
            allQuotes: filteredData
        })
        if(e.target.value=== ''){
            this.setState({
                allQuotes: this.state.quotes
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
        let response = await ApiCall.get(`${Url.DELETE_QUOTE}/${item}`, await config());
        if(response.status === 200){
            this.setState({spinning: false});
            this.getAllQuotes();
            return  NotificationManager.success(
                "Quote deleted Successfully",
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
                            <Link to='/app/quote/create'><Button size='lg' color={'secondary'}><IntlMessages id={"menu.create"} /></Button></Link>
                        </div>
                        <Breadcrumb heading="seo-tag.view" match={this.props.match} />
                        <Separator className="mb-5" />
                    </Colxx>
                </Row>
                <Row>
                    <Col>
                        <Card className="h-100">
                            <CardBody>
                                <CardTitle>
                                    Quotes
                                </CardTitle>
                                <ReactTable
                                    data={data}
                                    loading={this.state.spinning}
                                    activePage={this.state.page}
                                    displayLength={this.state.displayLength}
                                    total={this.state.allQuotes.length}
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
                                        <HeaderCell> Author </HeaderCell>
                                        <Cell>
                                            {(rowData, rowIndex) => {
                                                return <span>{rowData.author? rowData.author.name: "-"}</span>
                                            }}
                                        </Cell>
                                    </Column>
                                    <Column minWidth={200}  flexGrow={1} align="center">
                                        <HeaderCell> Description </HeaderCell>
                                        <Cell>
                                            {(rowData, rowIndex) => {
                                                return <div
                                                dangerouslySetInnerHTML={{
                                                    __html: rowData.description
                                                }}
                                                />
                                            }}
                                        </Cell>
                                    </Column>
                                    <Column minWidth={200}  flexGrow={1} align="center">
                                        <HeaderCell> Date </HeaderCell>
                                        <Cell>
                                            {(rowData, rowIndex) => {
                                                return <span>{moment(rowData.date).format('DD-MM-YYYY')}</span>
                                            }}
                                        </Cell>
                                    </Column>
                                    <Column minWidth={200}  flexGrow={1} align="center">
                                        <HeaderCell> IsPublished </HeaderCell>
                                        <Cell>
                                            {(rowData, rowIndex) => {
                                                return <span>{rowData.isPublished? <Badge color="success">YES</Badge> : "-"}</span>
                                            }}
                                        </Cell>
                                    </Column>
                                    <Column minWidth={200}  flexGrow={1} align="center">
                                        <HeaderCell>Actions</HeaderCell>
                                        <Cell>
                                            {(rowData, rowIndex) => {
                                                return <div>
                                                    {this.state.userPermissions.find(item => item.name === "quote.edit") &&
                                                    <Button color="secondary" size="xs" className="mb-2">
                                                        <Link to={`/app/quote/edit/${rowData._id}`} style={{color: 'white'}}><IntlMessages id="edit" /></Link>
                                                    </Button>}
                                                    {" "}{" "}
                                                    {this.state.userPermissions.find(item => item.name === "quote.delete") &&
                                                    <Button color="danger" size="xs" className="mb-2" onClick={()=> this.changeStatus(rowData._id)}>
                                                        <IntlMessages id="delete" />
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
