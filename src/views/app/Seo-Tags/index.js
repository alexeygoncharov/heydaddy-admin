import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
const CreateSeoTag = React.lazy(() =>
    import(/* webpackChunkName: "create-client" */ './create')
);
const UpdateSeoTag = React.lazy(() =>
    import(/* webpackChunkName: "create-client" */ './edit')
);
const AllSeoTags = React.lazy(() =>
    import(/* webpackChunkName: "create-client" */ './view')
);


const SeoTags = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/view`} />
            <Route
                path={`${match.url}/view`}
                render={props => <AllSeoTags {...props} />}
            />
            <Route
                path={`${match.url}/create`}
                render={props => <CreateSeoTag {...props} />}
            />
            <Route
                path={`${match.url}/edit/:slug`}
                render={props => <UpdateSeoTag {...props} />}
            />
            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default SeoTags;