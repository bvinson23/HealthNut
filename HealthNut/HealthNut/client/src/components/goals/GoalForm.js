import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { addGoal } from "../../modules/goalManager";
import { Form, FormGroup, Button, Container } from "reactstrap";

const AddNewGoal = () => {
    const [goal, setGoal] = useState({
        weight: 0,
        targetDate: ""
    });

    const history = useHistory();

    const handleInputChange = (evt) => {
        const newGoal = { ...goal }
        let selectedValue = evt.target.value
        newGoal[evt.target.id] = selectedValue
        setGoal(newGoal)
    };

    const handleSave = (click) => {
        click.preventDefault();
        addGoal(goal)
            .then(() => history.push("/goals"))
    };

    const handleCancelSave = (click) => {
        click.preventDefault();
        history.push("/goals")
    };

    return (
        <Container className="justified-content-center">
            <Form>
                <FormGroup>
                    <label>Weight Goal</label>
                    <input type="text"
                        id="weight"
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                        className="form-control"
                        placeholder="Weight Goal..."
                        value={goal.weight} />
                </FormGroup>
                <FormGroup>
                    <label>Target Date</label>
                    <input type="date"
                        id="targetDate"
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                        className="form-control"
                        value={goal.targetDate} />
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

export default AddNewGoal;