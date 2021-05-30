import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
const CreateTag = React.lazy(() =>
    import(/* webpackChunkName: "create-client" */ './create')
);
const UpdateTag = React.lazy(() =>
    import(/* webpackChunkName: "create-client" */ './edit')
);
const AllTags = React.lazy(() =>
    import(/* webpackChunkName: "create-client" */ './view')
);


const Tags = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/view`} />
            <Route
                path={`${match.url}/view`}
                render={props => <AllTags {...props} />}
            />
            <Route
                path={`${match.url}/create`}
                render={props => <CreateTag {...props} />}
            />
            <Route
                path={`${match.url}/edit/:slug`}
                render={props => <UpdateTag {...props} />}
            />
            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default Tags;