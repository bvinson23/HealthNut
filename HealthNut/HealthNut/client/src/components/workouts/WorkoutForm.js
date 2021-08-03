import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { addWorkout } from "../../modules/workoutManager";
import { Form, FormGroup, Button, Container } from "reactstrap";

const AddNewWorkout = () => {
    const [workout, setWorkout] = useState({
        name: "",
        caloriesBurned: "",
        duration: ""
    });
    const [duration, setDuration] = useState({});

    const history = useHistory();

    const handleInputChange = (evt) => {
        const newWorkout = { ...workout }
        let selectedValue = evt.target.value
        newWorkout[evt.target.id] = selectedValue
        setWorkout(newWorkout)
    };

    const handleSave = (click) => {
        click.preventDefault();
        if (workout.name === "") {
            window.alert("Please fill in all fields")
        } else {
            addWorkout(workout)
                .then(() => history.push("/dashboard"))
        };
    };

    const handleCancelSave = (click) => {
        click.preventDefault();
        history.push("/dashboard")
    };

    const handleDurationSave = (evt) => {
        evt.preventDefault();
        const newDuration = { ...duration }
        let selectedValue = evt.target.value
        newDuration[evt.target.id] = selectedValue
        setDuration(newDuration)
        
    }
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
                        placeholder="Describe your workout..."
                        value={workout.name} />
                </FormGroup>
                <FormGroup>
                    <label>Calories Burned</label>
                    <input type="text"
                        id="caloriesBurned"
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                        className="form-control"
                        placeholder="Calories Burned..."
                        value={workout.caloriesBurned} />
                </FormGroup>
                <FormGroup>
                    <label>Duration</label>
                    <input type="text"
                        id="duration"
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                        className="form-control"
                        placeholder="Duration..."
                        value={workout.duration} />
                </FormGroup>
                <FormGroup>
                    <label>Date</label>
                    <input type="date"
                        id="date"
                        onChange={handleInputChange}
                        required
                        autoComplete="off"
                        className="form-control"
                        value={workout.date} />
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

export default AddNewWorkout;