import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { deleteMeal } from "../../modules/mealManager";

const Meal = ({ meal, getMeals }) => {
    const history = useHistory();
    const deleteSelectedMeal = (evt) => {
        evt.preventDefault();
        let result = window.confirm("Are you sure you want to delete this meal?");
        if (result) {
            deleteMeal(meal.id).then(() => getMeals());
        }
    }

    return (
        <Card>
            <CardBody>
                <div className="MealList">
                    <label style={{ width: "10em" }}>Meal: {meal.mealCategory.name}</label>
                    <label style={{ width: "10em" }}>Calories: {meal.calories}</label>
                    <label style={{ width: "10em" }}>Description: {meal.name}</label>
                    <Button onClick={() => history.push(`/meals/edit/${meal.id}`)} style={{width: "5em", marginLeft: ".5rem"}}>Edit</Button>
                    <Button onClick={deleteSelectedMeal} style={{width: "5em", marginLeft: ".5rem"}}>Delete</Button>
                </div>
            </CardBody>
        </Card>
    )
};

export default Meal;