import React from "react";
import { Card, CardBody, Button } from "reactstrap";
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

    return (
        <Card>
            <CardBody>
                <div className="WorkoutList">
                    <label style={{ width: "10em" }}>Workout: {workout.name}</label>
                    <label style={{ width: "10em" }}>Calories Burned: {workout.caloriesBurned}</label>
                    <label style={{ width: "10em" }}>Duration: {workout.duration}</label>
                    <Button onClick={() => history.push(`/workouts/edit/${workout.id}`)} style={{width: "5em", marginLeft: ".5rem"}}>Edit</Button>
                    <Button onClick={deleteSelectedWorkout} style={{width: "5em", marginLeft: ".5rem"}}>Delete</Button>
                </div>
            </CardBody>
        </Card>
    )
};

export default Workout;