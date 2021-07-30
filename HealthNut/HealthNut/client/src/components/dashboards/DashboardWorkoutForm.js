import React from "react";
import GoalList from "../goals/GoalList";
import NoteList from "../notes/NoteList";
import WorkoutList from "../workouts/WorkoutList";
import AddNewWorkout from "../workouts/WorkoutForm";
import { Col, Container, Row } from "reactstrap";

const DashboardWorkoutForm = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col sm="3">
                        <GoalList />
                        <NoteList />
                    </Col>
                    <Col>
                        <AddNewWorkout />
                    </Col>
                    <Col sm="5">
                        <WorkoutList />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default DashboardWorkoutForm;