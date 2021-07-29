import React, { useState, useEffect } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import { Navbar, NavbarToggler, NavbarBrand } from "reactstrap";
import { getCurrentUser } from "../../modules/authManager";
import { getRecentWeight } from "../../modules/weightManager";
import Goal from "./GoalCard";

const GoalList = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const [user, setUser] = useState({});
    const [weight, setWeight] = useState({});

    const getUser = () => {
        getCurrentUser().then(user => setUser(user));
    };

    const getWeight = () => {
        getRecentWeight().then(
            weight.length === 0 ? setWeight(0) :
        weight => setWeight(weight));
    };

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        getWeight();
    }, []);

    return (
        <div className="justified-content-center">
            <Navbar color="light" light expand="md">
                <NavbarBrand tag={RRNavLink} to="/goals">Goals</NavbarBrand>
                <NavbarToggler onClick={toggle} />
            </Navbar>
            <Goal user={user} key={user.id} weight={weight} />
        </div>
    )
};

export default GoalList;