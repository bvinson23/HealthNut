import React, { useState, useEffect } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import { NavbarToggler, NavbarBrand, ToastHeader, Toast, ToastBody } from "reactstrap";
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
        <Toast>
            <ToastHeader color="light" light expand="md">
                <NavbarBrand tag={RRNavLink} to="/meals">Recent Meals</NavbarBrand>
                <NavbarToggler onClick={toggle} />
            </ToastHeader>
            <ToastBody>
                {meals.map((meal) => (
                    <Meal meal={meal} key={meal.id} getMeals={getMeals} />
                ))}
            </ToastBody>
        </Toast>
    )
};

export default MealList;