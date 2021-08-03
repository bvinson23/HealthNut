import React from "react";
import GoalList from "../goals/GoalList";
import MealList from "../meals/MealList";
import WorkoutList from "../workouts/WorkoutList";
import AddNewNote from "../notes/NoteForm";
import { Col, Container, Row } from "reactstrap";

const DashboardNoteForm = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col sm="3">
                        <GoalList />
                        <WorkoutList />
                    </Col>
                    <Col>
                        <AddNewNote />
                    </Col>
                    <Col sm="5">
                        <MealList />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default DashboardNoteForm;