import React from "react";
import GoalList from "../goals/GoalList";
import NoteList from "../notes/NoteList";
import WorkoutList from "../workouts/WorkoutList";
import EditExistingWorkout from "../workouts/WorkoutEditForm";
import { Col, Container, Row } from "reactstrap";

const DashboardWorkoutEdit = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col sm="3">
                        <GoalList />
                        <NoteList />
                    </Col>
                    <Col>
                        <EditExistingWorkout />
                    </Col>
                    <Col sm="5">
                        <WorkoutList />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default DashboardWorkoutEdit;