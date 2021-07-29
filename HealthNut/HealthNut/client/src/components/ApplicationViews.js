import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import MealList from "./meals/MealList";
import NoteList from "./notes/NoteList";
import WorkoutList from "./workouts/WorkoutList";
import UpdateGoal from "./goals/GoalUpdateForm";
import Dashboard from "./dashboards/Dashboard";
import DashboardMealForm from "./dashboards/DashboardMealForm";
import DashboardMealEdit from "./dashboards/DashboardMealEditForm";
import DashboardWorkoutForm from "./dashboards/DashboardWorkoutForm";
import DashboardWorkoutEdit from "./dashboards/DashboardWorkoutEditForm";
import DashboardNoteForm from "./dashboards/DashboardNoteForm";
import DashboardNoteEdit from "./dashboards/DashboardNoteEditForm";
import DashboardWeighIn from "./dashboards/DashboardWeighIn";

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

                <Route path="/dashboard">
                    {isLoggedIn ? <Dashboard /> : <Redirect to="/login" />}
                </Route>

                <Route path="/meals" exact>
                    {isLoggedIn ? <MealList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/meals/add">
                    {isLoggedIn ? <DashboardMealForm /> : <Redirect to="/login" />}
                </Route>

                <Route path="/meals/edit/:id">
                    {isLoggedIn ? <DashboardMealEdit /> : <Redirect to="/login" />}
                </Route>

                <Route path="/notes" exact>
                    {isLoggedIn ? <NoteList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/notes/add">
                    {isLoggedIn ? <DashboardNoteForm /> : <Redirect to="/login" />}
                </Route>

                <Route path="/notes/edit/:id">
                    {isLoggedIn ? <DashboardNoteEdit /> : <Redirect to="/login" />}
                </Route>

                <Route path="/workouts" exact>
                    {isLoggedIn ? <WorkoutList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/workouts/add">
                    {isLoggedIn ? <DashboardWorkoutForm /> : <Redirect to="/login" />}
                </Route>

                <Route path="/workouts/edit/:id">
                    {isLoggedIn ? <DashboardWorkoutEdit /> : <Redirect to="/login" />}
                </Route>

                <Route path="/goals/edit/:id">
                    {isLoggedIn ? <UpdateGoal /> : <Redirect to="/login" />}
                </Route>

                <Route path="/weight/add">
                    {isLoggedIn ? <DashboardWeighIn /> : <Redirect to="/login" />}
                </Route>
            </Switch>
        </main>
    );
};

export default ApplicationViews;