import React, { useState, useEffect } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
    Navbar,
    NavbarToggler,
    NavbarBrand
} from "reactstrap";
import { getAllMeals } from "../../modules/mealManager";
import Meal from "./MealCard";

const MealList = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const [meals, setMeals] = useState([]);

    const getMeals = () => {
        getAllMeals().then(meals => setMeals(meals));
    };

    useEffect(() => {
        getMeals();
    }, []);

    return (
        <div className="container">
            <Navbar color="light" light expand="md">
                <NavbarBrand tag={RRNavLink} to="/meals">Meals</NavbarBrand>
                <NavbarToggler onClick={toggle} />
            </Navbar>
            {meals.map((meal) => (
                <Meal meal={meal} key={meal.id} getMeals={getMeals} />
            ))}
        </div>
    )
};

export default MealList;