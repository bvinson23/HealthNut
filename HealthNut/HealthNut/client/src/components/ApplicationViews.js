import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";

const ApplicationViews = ({ isLoggedIn }) => {
    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    <Login />
                </Route>
            </Switch>
        </main>
    );
};

export default ApplicationViews;