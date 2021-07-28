import React, { useState, useEffect } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import { Navbar, NavbarToggler, NavbarBrand } from "reactstrap";
import { getAllWeights } from "../../modules/weightManager";
import Weight from "./WeightCard";

const WeightList = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const [weights, setWeights] = useState([]);

    const getWeights = () => {
        getAllWeights().then(weights => setWeights(weights));
    };

    useEffect(() => {
        getWeights();
    }, []);

    return (
        <div className="container">
            <Navbar color="light" light expand="md">
                <NavbarBrand tag={RRNavLink} to="/weights">Weights</NavbarBrand>
                <NavbarToggler onClick={toggle} />
            </Navbar>
            {weights.map((weight) => (
                <Weight weight={weight} key={weight.id} getWeights={getWeights} />
            ))}
        </div>
    )
};

export default WeightList;