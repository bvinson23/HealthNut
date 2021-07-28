import React, { useState, useEffect } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import { Navbar, NavbarToggler, NavbarBrand } from "reactstrap";
import { getAllGoals } from "../../modules/goalManager";
import Goal from "./GoalCard";

const GoalList = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const [goals, setGoals] = useState([]);

    const getGoals = () => {
        getAllGoals().then(goals => setGoals(goals));
    };

    useEffect(() => {
        getGoals();
    }, []);

    return (
        <div className="container">
            <Navbar color="light" light expand="md">
                <NavbarBrand tag={RRNavLink} to="/goals">Goals</NavbarBrand>
                <NavbarToggler onClick={toggle} />
            </Navbar>
            {goals.map((goal) => (
                <Goal goal={goal} key={goal.id} getGoals={getGoals} />
            ))}
        </div>
    )
};

export default GoalList;