import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
const CreateQuote = React.lazy(() => import( './create'));
const UpdateQuote = React.lazy(() => import( './edit'));
const AllQuotes = React.lazy(() => import( './view'));
const Quotes = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/view`} />
            <Route
                path={`${match.url}/view`}
                render={props => <AllQuotes {...props} />}
            />
            <Route
                path={`${match.url}/create`}
                render={props => <CreateQuote {...props} />}
            />
            <Route
                path={`${match.url}/edit/:slug`}
                render={props => <UpdateQuote {...props} />}
            />
            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default Quotes;