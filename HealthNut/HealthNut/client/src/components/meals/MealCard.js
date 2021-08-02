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
                <div className="container text-left">
                    <p className="text-left">Meal: {meal.mealCategory.name}</p>
                    <p className="text-left">Calories: {meal.calories}</p>
                    <p className="text-left">Description: {meal.name}</p>
                    <Button onClick={() => history.push(`/meals/edit/${meal.id}`)} style={{width: "5em", marginLeft: ".5rem"}}>Edit</Button>
                    <Button onClick={deleteSelectedMeal} style={{width: "5em", marginLeft: ".5rem"}}>Delete</Button>
                </div>
            </CardBody>
        </Card>
    )
};

export default Meal;