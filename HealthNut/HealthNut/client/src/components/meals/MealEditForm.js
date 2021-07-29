import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { editMeal, getMealById } from "../../modules/mealManager";
import { Form, FormGroup, Button, Container } from "reactstrap";

const EditExistingMeal = () => {
    const [meal, setMeal] = useState({});
    const { id } = useParams();

    const history = useHistory();

    const handleInputChange = (evt) => {
        const editedMeal = { ...meal}
        let selectedValue = evt.target.value
        editedMeal[evt.target.id] = selectedValue
        setMeal(editedMeal)
    };

    const handleSave = (click) => {
        click.preventDefault();
        editMeal(meal)
            .then(() => history.push("/dashboard"))
    };

    const handleCancel = (click) => {
        click.preventDefault();
        history.push("/dashboard")
    };

    useEffect(() => {
        getMealById(id).then(setMeal)
    }, [id]);

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
                        defaultValue={meal.name} />
                </FormGroup>
                <FormGroup>
                    <label>Calories</label>
                    <input type="text"
                        id="calories"
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                        className="form-control"
                        defaultValue={meal.calories} />
                </FormGroup>
                <FormGroup>
                    <label>Meal</label>
                    <input type="text"
                        id="mealCategoryId"
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                        className="form-control"
                        defaultValue={meal.mealCategoryId} />
                </FormGroup>
            </Form>
            <Button className="article-btn"
                onClick={handleSave}>Save</Button>
            <Button className="article-btn"
                variant="warning"
                onClick={handleCancel}>Cancel</Button>
        </Container>
    )
};

export default EditExistingMeal;