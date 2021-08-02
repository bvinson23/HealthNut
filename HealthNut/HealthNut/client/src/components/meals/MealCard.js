import React from "react";
import { Card, CardBody, Button, Row } from "reactstrap";
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

    const handleDate = () => {
        let date = new Date(meal.mealDate).toDateString();
        return date;
    };

    return (
        <Card>
            <CardBody>
                <div className="container">
                    <Row>Meal: {meal.mealCategory.name}</Row>
                    <Row>Calories: {meal.calories}</Row>
                    <Row>Description: {meal.name}</Row>
                    <Row>Date: {handleDate()}</Row>
                    <Button onClick={() => history.push(`/meals/edit/${meal.id}`)} style={{width: "5em", marginLeft: ".5rem"}}>Edit</Button>
                    <Button onClick={deleteSelectedMeal} style={{width: "5em", marginLeft: ".5rem"}}>Delete</Button>
                </div>
            </CardBody>
        </Card>
    )
};

export default Meal;