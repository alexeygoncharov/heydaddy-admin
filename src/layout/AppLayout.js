import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter} from "react-router-dom";

import TopNav from "../containers/navs/Topnav";
import Sidebar from "../containers/navs/Sidebar";

class AppLayout extends Component {
  render() {
    const { containerClassnames } = this.props;
    return (
      <div id="app-container" className={containerClassnames}>
        <TopNav history={this.props.history} />
        <Sidebar />
        <main>
            {this.props.children}
        </main>
      </div>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};
const mapActionToProps={}

export default withRouter(connect(
  mapStateToProps,
  mapActionToProps
)(AppLayout));
