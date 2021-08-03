import React from "react";
import { Button, Row, Toast, ToastBody } from "reactstrap";
import { useHistory } from "react-router-dom";
import { deleteWorkout } from "../../modules/workoutManager";

const Workout = ({ workout, getWorkouts }) => {
    const history = useHistory();
    const deleteSelectedWorkout = (evt) => {
        evt.preventDefault();
        let result = window.confirm("Are you sure you want to delete this workout?");
        if (result) {
            deleteWorkout(workout.id).then(() => getWorkouts());
        }
    }

    const handleDate = () => {
        let date = new Date(workout.date).toDateString();
        return date;
    };

    return (
        <Toast style={{backgroundColor: "#61B521"}}>
            <ToastBody>
                <div className="WorkoutList">
                    <Row>Date: {handleDate()}</Row>
                    <Row>Workout: {workout.name}</Row>
                    <Row>Calories Burned: {workout.caloriesBurned}</Row>
                    <Row>Duration: {workout.duration}</Row>
                    <Button onClick={() => history.push(`/workouts/edit/${workout.id}`)} style={{width: "5em", marginLeft: ".5rem", backgroundColor: "#4472CA"}}>Edit</Button>
                    <Button onClick={deleteSelectedWorkout} style={{width: "5em", marginLeft: ".5rem", backgroundColor: "#4472CA"}}>Delete</Button>
                </div>
            </ToastBody>
        </Toast>
    )
};

export default Workout;