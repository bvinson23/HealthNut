import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { addMeal } from "../../modules/mealManager";
import { Form, FormGroup, Button, Container } from "reactstrap";

const AddNewMeal = () => {
    const [meal, setMeal] = useState({
        name: "",
        calories: 0,
        mealCategoryId: 0
    });

    const history = useHistory();

    const handleInputChange = (evt) => {
        const newMeal = { ...meal }
        let selectedValue = evt.target.value
        newMeal[evt.target.id] = selectedValue
        setMeal(newMeal)
    };

    const handleSave = (click) => {
        click.preventDefault();
        if (meal.name === "") {
            window.alert("Please fill in all fields")
        } else {
            addMeal(meal)
                .then(() => history.push("/meals"))
        };
    };

    const handleCancelSave = (click) => {
        click.preventDefault();
        history.push("/meals")
    };

    return (
        <Container className="justified-content-center">
            <Form>
                <FormGroup>
                    <label>Description</label>
                    <input type="text"
                        id="name"
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                        className="form-control"
                        placeholder="Describe your meal..."
                        value={meal.name} />
                </FormGroup>
                <FormGroup>
                    <label>Calories</label>
                    <input type="text"
                        id="calories"
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                        className="form-control"
                        placeholder="Calories..."
                        value={meal.calories} />
                </FormGroup>
                <FormGroup>
                    <label>Meal</label>
                    <input type="text"
                        id="mealCategoryId"
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                        className="form-control"
                        placeholder="Choose your meal"
                        value={meal.mealCategoryId} />
                </FormGroup>
            </Form>
            <Button className="article-btn"
                onClick={handleSave}>Save</Button>
            <Button className="article-btn"
                variant="warning"
                onClick={handleCancelSave}>Cancel</Button>
        </Container>
    )
};

export default AddNewMeal;