import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { editWorkout, getWorkoutById } from "../../modules/workoutManager";
import { Form, FormGroup, Button, Toast, ToastBody } from "reactstrap";

const EditExistingWorkout = () => {
    const [workout, setWorkout] = useState({});
    const { id } = useParams();

    const history = useHistory();

    const handleInputChange = (evt) => {
        const editedWorkout = { ...workout }
        let selectedValue = evt.target.value
        editedWorkout[evt.target.id] = selectedValue
        setWorkout(editedWorkout)
    };

    const handleSave = (click) => {
        click.preventDefault();
        editWorkout(workout)
            .then(() => history.push("/dashboard"))
    };

    const handleCancel = (click) => {
        click.preventDefault();
        history.push("/dashboard")
    };

    useEffect(() => {
        getWorkoutById(id).then(setWorkout)
    }, [id]);

    return (
        <Toast>
            <ToastBody>
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
                    <FormGroup>
                        <label>Date</label>
                        <input type="date"
                            id="date"
                            onChange={handleInputChange}
                            required
                            autoComplete="off"
                            className="form-control"
                            defaultValue={workout.date} />
                    </FormGroup>
                </Form>
                <Button className="article-btn"
                    style={{backgroundColor: "#4472CA"}}
                    onClick={handleSave}>Save</Button>
                <Button className="article-btn"
                    style={{backgroundColor: "#4472CA"}}
                    variant="warning"
                    onClick={handleCancel}>Cancel</Button>
            </ToastBody>
        </Toast>
    )
};

export default EditExistingWorkout;