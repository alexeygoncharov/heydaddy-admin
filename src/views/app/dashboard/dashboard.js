import React, { Component, Fragment } from 'react';
import { injectIntl } from 'react-intl';
import { Row } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
// import RecentSignals from "./comonents/recent-signals";


class DefaultDashboard extends Component {
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

            </Fragment>
        );
    }
}
export default injectIntl(DefaultDashboard);
