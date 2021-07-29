import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import MealList from "./meals/MealList";
import NoteList from "./notes/NoteList";
import AddNewNote from "./notes/NoteForm";
import EditExistingNote from "./notes/NoteEditForm";
import WorkoutList from "./workouts/WorkoutList";
import AddNewWorkout from "./workouts/WorkoutForm";
import EditExistingWorkout from "./workouts/WorkoutEditForm";
import GoalList from "./goals/GoalList"
import AddNewGoal from "./goals/GoalForm";
import EditExistingGoal from "./goals/GoalEditForm";
import AddNewWeight from "./weights/WeightForm";
import Dashboard from "./dashboards/Dashboard";
import DashboardMealForm from "./dashboards/DashboardMealForm";
import DashboardMealEditForm from "./dashboards/DashboardMealEditForm";

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
                    {isLoggedIn ? <DashboardMealEditForm /> : <Redirect to="/login" />}
                </Route>

                <Route path="/notes" exact>
                    {isLoggedIn ? <NoteList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/notes/add">
                    {isLoggedIn ? <AddNewNote /> : <Redirect to="/login" />}
                </Route>

                <Route path="/notes/edit/:id">
                    {isLoggedIn ? <EditExistingNote /> : <Redirect to="/login" />}
                </Route>

                <Route path="/workouts" exact>
                    {isLoggedIn ? <WorkoutList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/workouts/add">
                    {isLoggedIn ? <AddNewWorkout /> : <Redirect to="/login" />}
                </Route>

                <Route path="/workouts/edit/:id">
                    {isLoggedIn ? <EditExistingWorkout /> : <Redirect to="/login" />}
                </Route>
                
                <Route path="/goals" exact>
                    {isLoggedIn ? <GoalList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/goals/add">
                    {isLoggedIn ? <AddNewGoal /> : <Redirect to="/login" />}
                </Route>

                <Route path="/goals/edit/:id">
                    {isLoggedIn ? <EditExistingGoal /> : <Redirect to="/login" />}
                </Route>

                <Route path="/weight/add">
                    {isLoggedIn ? <AddNewWeight /> : <Redirect to="/login" />}
                </Route>
            </Switch>
        </main>
    );
};

export default ApplicationViews;