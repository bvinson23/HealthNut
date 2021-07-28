import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { editWorkout, getWorkoutById } from "../../modules/workoutManager";
import { Form, FormGroup, Button, Container } from "reactstrap";

const EditExistingWorkout = () => {
    const [workout, setWorkout] = useState({});
    const { id } = useParams();

    const history = useHistory();

    const handleInputChange = (evt) => {
        const editedWorkout = { ...workout}
        let selectedValue = evt.target.value
        editedWorkout[evt.target.id] = selectedValue
        setWorkout(editedWorkout)
    };

    const handleSave = (click) => {
        click.preventDefault();
        editWorkout(workout)
            .then(() => history.push("/workouts"))
    };

    const handleCancel = (click) => {
        click.preventDefault();
        history.push("/workouts")
    };

    useEffect(() => {
        getWorkoutById(id).then(setWorkout)
    }, [id]);

    return (
        <Container className="justified-content-center">
            <Form>
                <FormGroup>
                    <label>Workout</label>
                    <input type="text"
                        id="name"
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                        className="form-control"
                        defaultValue={workout.name} />
                </FormGroup>
                <FormGroup>
                    <label>Calories Burned</label>
                    <input type="text"
                        id="caloriesBurned"
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                        className="form-control"
                        defaultValue={workout.caloriesBurned} />
                </FormGroup>
                <FormGroup>
                    <label>Duration</label>
                    <input type="text"
                        id="duration"
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                        className="form-control"
                        defaultValue={workout.duration} />
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

export default EditExistingWorkout;