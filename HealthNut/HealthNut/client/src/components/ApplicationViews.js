import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import MealList from "./meals/MealList";
import AddNewMeal from "./meals/MealForm";
import EditExistingMeal from "./meals/MealEditForm";

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

                <Route path="/meals" exact>
                    {isLoggedIn ? <MealList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/meals/add">
                    {isLoggedIn ? <AddNewMeal /> : <Redirect to="/login" />}
                </Route>

                <Route path="/meals/edit/:id">
                    {isLoggedIn ? <EditExistingMeal /> : <Redirect to="/login" />}
                </Route>
            </Switch>
        </main>
    );
};

export default ApplicationViews;