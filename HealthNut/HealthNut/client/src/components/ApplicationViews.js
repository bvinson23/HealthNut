import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import MealList from "./meals/MealList";

const ApplicationViews = ({ isLoggedIn }) => {
    return (
        <main>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>

                <Route path="/meals">
                    {isLoggedIn ? <MealList /> : <Redirect to="/login" />}
                </Route>
            </Switch>
        </main>
    );
};

export default ApplicationViews;