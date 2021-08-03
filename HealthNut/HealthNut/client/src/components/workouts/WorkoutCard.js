import React from "react";
import { Card, CardBody, Button, Row } from "reactstrap";
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
        <Card>
            <CardBody>
                <div className="WorkoutList">
                    <Row>Date: {handleDate()}</Row>
                    <Row>Workout: {workout.name}</Row>
                    <Row>Calories Burned: {workout.caloriesBurned}</Row>
                    <Row>Duration: {workout.duration}</Row>
                    <Button onClick={() => history.push(`/workouts/edit/${workout.id}`)} style={{width: "5em", marginLeft: ".5rem"}}>Edit</Button>
                    <Button onClick={deleteSelectedWorkout} style={{width: "5em", marginLeft: ".5rem"}}>Delete</Button>
                </div>
            </CardBody>
        </Card>
    )
};

export default Workout;