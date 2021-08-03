import React, { useState, useEffect } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import { Navbar, NavbarToggler, NavbarBrand, Toast, ToastHeader, ToastBody } from "reactstrap";
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
        getRecentWeight().then(weight => setWeight(weight));
    };

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        getWeight();
    }, []);

    return (
        <Toast>
            <ToastHeader color="light" light expand="md">
                <NavbarBrand>Goals</NavbarBrand>
                <NavbarToggler onClick={toggle} />
            </ToastHeader>
            <ToastBody>
                <Goal user={user} key={user.id} weight={weight} />
            </ToastBody>
        </Toast>
    )
};

export default GoalList;