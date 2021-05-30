import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
const CreatePost = React.lazy(() => import( './create'));
const UpdatePost = React.lazy(() => import( './edit'));
const AllPosts = React.lazy(() => import( './view'));
const Posts = ({ match }) => (
    <Suspense fallback={<div className="loading" />}>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/view`} />
            <Route
                path={`${match.url}/view`}
                render={props => <AllPosts {...props} />}
            />
            <Route
                path={`${match.url}/create`}
                render={props => <CreatePost {...props} />}
            />
            <Route
                path={`${match.url}/edit/:slug`}
                render={props => <UpdatePost {...props} />}
            />
            <Redirect to="/error" />
        </Switch>
    </Suspense>
);
export default Posts;