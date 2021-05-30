import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
const CreateAuthor = React.lazy(() =>
    import(/* webpackChunkName: "create-client" */ './create')
);
const UpdateAuthor = React.lazy(() =>
    import(/* webpackChunkName: "create-client" */ './edit')
);
const AllAuthors = React.lazy(() =>
    import(/* webpackChunkName: "create-client" */ './view')
);


const Authors = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/view`} />
            <Route
                path={`${match.url}/view`}
                render={props => <AllAuthors {...props} />}
            />
            <Route
                path={`${match.url}/create`}
                render={props => <CreateAuthor {...props} />}
            />
            <Route
                path={`${match.url}/edit/:slug`}
                render={props => <UpdateAuthor {...props} />}
            />
            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default Authors;