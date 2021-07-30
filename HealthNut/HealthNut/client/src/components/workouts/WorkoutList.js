import React, { useState, useEffect } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
    Navbar,
    NavbarToggler,
    NavbarBrand
} from "reactstrap";
import { getAllWorkouts } from "../../modules/workoutManager";
import Workout from "./WorkoutCard";

const WorkoutList = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const [workouts, setWorkouts] = useState([]);

    const getWorkouts = () => {
        getAllWorkouts().then(workouts => setWorkouts(workouts));
    };

    useEffect(() => {
        getWorkouts();
    }, []);

    return (
        <div className="container">
            <Navbar color="light" light expand="md">
                <NavbarBrand tag={RRNavLink} to="/workouts">Recent Workouts</NavbarBrand>
                <NavbarToggler onClick={toggle} />
            </Navbar>
            {workouts.map((workout) => (
                <Workout workout={workout} key={workout.id} getWorkouts={getWorkouts} />
            ))}
        </div>
    )
};

export default WorkoutList;