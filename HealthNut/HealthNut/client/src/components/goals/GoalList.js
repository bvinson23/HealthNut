import React, { useState, useEffect } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import { Navbar, NavbarToggler, NavbarBrand } from "reactstrap";
import { getAllGoals } from "../../modules/goalManager";
import { getAllWeights } from "../../modules/weightManager";
import Goal from "./GoalCard";

const GoalList = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const [goals, setGoals] = useState([]);
    const [weights, setWeights] = useState([]);

    const getGoals = () => {
        getAllGoals().then(goals => setGoals(goals));
    };

    const getWeights = () => {
        getAllWeights().then(weights => setWeights(weights));
    };

    useEffect(() => {
        getGoals();
    }, []);

    useEffect(() => {
        getWeights();
    }, []);

    return (
        <div className="container">
            <Navbar color="light" light expand="md">
                <NavbarBrand tag={RRNavLink} to="/goals">Goals</NavbarBrand>
                <NavbarToggler onClick={toggle} />
            </Navbar>
            {goals.map((goal) => (
                <Goal goal={goal} key={goal.id} getGoals={getGoals}
                    weight={weight} key={weight.id} />
            ))}
        </div>
    )
};

export default GoalList;