import React, { Component, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { Row } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
// import RecentSignals from "./comonents/recent-signals";
import Verified from './comonents/verified'


class DefaultDashboard extends Component {

    constructor() {
        super();
        this.state = {
            selectAll: false,
            checked: [],
            solving: false,
            spinning: true,
            userPermissions: localStorage.userPermission !== undefined ? JSON.parse(localStorage.userPermission) : [],
            //Pagination
            displayLength: 10,
            page: 1
        };
    }
    render() {
        return (
            <Fragment>
                <Row>
                    <Colxx xxs="12">
                        <Breadcrumb heading="menu.dashboard" match={this.props.match} />
                        <Separator className="mb-5" />
                    </Colxx>
                </Row>
                <Row>
                    <Colxx lg="12" xl="12" className="mb-4">
                        {/*<RecentSignals />*/}
                        <div className="jumbotron text-center">
                            <h1 className="display-4">The HeyDaddy Dashboard!</h1>
                            <hr className="my-4"/>
                        </div>
                    </Colxx>
                </Row>
                {
                    this.state.userPermissions.find(item => item.name === 'verified')&&
                    <Verified />
                }
            </Fragment>
        );
    }
}
export default injectIntl(DefaultDashboard);
