import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { editGoal, getGoalById } from "../../modules/goalManager";
import { Form, FormGroup, Button, Container } from "reactstrap";

const EditExistingGoal = () => {
    const [goal, setGoal] = useState({});
    const { id } = useParams();

    const history = useHistory();

    const handleInputChange = (evt) => {
        const editedGoal = { ...goal }
        let selectedValue = evt.target.value
        editedGoal[evt.target.id] = selectedValue
        setGoal(editedGoal)
    };

    const handleSave = (click) => {
        click.preventDefault();
        editGoal(goal)
            .then(() => history.push("/goals"))
    };

    const handleCancel = (click) => {
        click.preventDefault();
        history.push("/goals")
    };

    useEffect(() => {
        getGoalById(id).then(setGoal)
    }, [id]);

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
                        defaultValue={goal.weight} />
                </FormGroup>
                <FormGroup>
                    <label>Target Date</label>
                    <input type="date"
                        id="targetDate"
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                        className="form-control"
                        defaultValue={goal.targetDate} />
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

export default EditExistingGoal;