import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { addMeal, getMealCategories } from "../../modules/mealManager";
import { Form, FormGroup, Button, Toast, ToastBody } from "reactstrap";

const AddNewMeal = () => {
    const [meal, setMeal] = useState({
        name: "",
        calories: "",
        mealCategoryId: 0
    });
    const [categories, setCategories] = useState([]);

    const history = useHistory();

    const getCategories = () => {
        getMealCategories().then(categories => setCategories(categories));
    }

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
                .then(() => history.push("/dashboard"))
        };
    };

    const handleCancelSave = (click) => {
        click.preventDefault();
        history.push("/dashboard")
    };

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
                            value={meal.mealDate} />
                    </FormGroup>
                </Form>
                <Button className="article-btn"
                    style={{ backgroundColor: "#4472CA" }}
                    onClick={handleSave}>Save</Button>
                <Button className="article-btn"
                    style={{ backgroundColor: "#4472CA" }}
                    variant="warning"
                    onClick={handleCancelSave}>Cancel</Button>
            </ToastBody>
        </Toast>
    )
};

export default AddNewMeal;