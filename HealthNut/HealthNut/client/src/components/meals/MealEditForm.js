import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { editMeal, getMealById, getMealCategories } from "../../modules/mealManager";
import { Form, FormGroup, Button, Toast, ToastBody } from "reactstrap";

const EditExistingMeal = () => {
    const [meal, setMeal] = useState({});
    const { id } = useParams();

    const history = useHistory();

    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        getMealCategories().then(categories => setCategories(categories));
    }

    const handleInputChange = (evt) => {
        const editedMeal = { ...meal }
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

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <Toast>
            <ToastBody>
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
                        <select type="select"
                            id="mealCategoryId"
                            onChange={handleInputChange}
                            required
                            autoComplete="off"
                            className="form-control"
                            placeholder="Choose your meal"
                            value={meal.mealCategoryId}>
                            <option value="0">Select a meal</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))} </select>
                    </FormGroup>
                    <FormGroup>
                        <label>Date</label>
                        <input type="date"
                            id="mealDate"
                            onChange={handleInputChange}
                            required
                            autoComplete="off"
                            className="form-control"
                            defaultValue={meal.mealDate} />
                    </FormGroup>
                </Form>
                <Button className="article-btn"
                    style={{ backgroundColor: "#4472CA" }}
                    onClick={handleSave}>Save</Button>
                <Button className="article-btn"
                    style={{ backgroundColor: "#4472CA" }}
                    variant="warning"
                    onClick={handleCancel}>Cancel</Button>
            </ToastBody>
        </Toast>
    )
};

export default EditExistingMeal;